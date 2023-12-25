const fs = require('fs');
const path = require('path');
exports.bootstrap = app => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.get('origin') || '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, pref_lang, tempuserid, cache-control, X-CSRF-TOKEN');
        res.header('Access-Control-Allow-Credentials', true);

        if ('OPTIONS' === req.method) {
            return res.status(200).send();
        }

        req.tracker = new RequestTracker(req, res);

        next();
    });

    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') {
            return;
        }

        const route = require(`${__dirname}/${file}`);

        if (!route || !route.router) {
            return;
        }

        if (route.basePath) {
            if (route.excludeMiddlewares) {
                app.use(`/${route.excludePrefix ? '' : 'api/'}:locale/${route.basePath ? `${route.basePath}` : ''}`, route.router);
            }
            else {
                console.log('2')
                console.log(`/${route.excludePrefix ? '' : 'api/'}:locale/${route.basePath ? `${route.basePath}` : ''}`, middleware.isAuthenticated, route.router)
                console.log(`/${route.excludePrefix ? '' : 'api/'}:locale/organizations/:subdomain/${route.basePath ? `${route.basePath}` : ''}`, middleware.organizationExists, middleware.isAuthenticated, middleware.belongsToOrganization, route.router)
                app.use(`/${route.excludePrefix ? '' : 'api/'}:locale/${route.basePath ? `${route.basePath}` : ''}`, middleware.isAuthenticated, route.router);
                app.use(`/${route.excludePrefix ? '' : 'api/'}:locale/organizations/:subdomain/${route.basePath ? `${route.basePath}` : ''}`, middleware.organizationExists, middleware.isAuthenticated, middleware.belongsToOrganization, route.router);
            }
        } else {
            console.log(`/${route.excludePrefix ? '' : 'api/'}`, route.router)
            app.use(`/${route.excludePrefix ? '' : 'api/'}`, route.router);
        }
    });
}

class RequestTracker {
    constructor(req, res) {
        this.req = req;
        this.res = res;

        this.request = {
            id: helper.uuid(),
            method: req.method,
            path: req.path,
            query: Object.keys(req.query).length ? req.query : null,
            params: Object.keys(req.params).length ? req.params : null,
            body: Object.keys(req.body).length ? req.body : null,
            headers: _.omit(req.headers, ['authorization']),
            user_id: false,
            user_data: null,
            statusCode: 0,
            async: false,
            error: null,
            startTime: req._startTime,
            responseSendTime: null,
            endTime: null,
            processTime: 0
        };

        if (req.headers.authorization) {
            try {
                this.request.user_data = service.jwt.decode(req.headers.authorization.split('Bearer ')[1]);
                this.request.user_id = this.request.user_data.id;
            } catch (e) { }
        }

        this.skip = config.debugger.exclude.some(regex => {
            return (RegExp(regex)).test(this.request.path);
        });

        this.checkResponseSent = setTimeout(() => {
            if (!this.request.responseSendTime) {
                this.uploadFileToS3();
            }
        }, 2000);

        this.insert();
        this.initEventListener();
    }

    markAsync() {
        this.request.async = true;
    }

    setError(error) {
        this.request.error = error;

        this.update();
    }

    complete() {
        if (!this.request.async) {
            return;
        }

        const time = new Date();

        this.request.endTime = time;

        this.update();
    }

    initEventListener() {
        this.res.on('finish', () => {
            const time = new Date();

            this.request.statusCode = this.res.statusCode;

            if (!this.request.responseSendTime) {
                this.request.responseSendTime = time;
            }

            if (!this.request.async) {
                this.request.endTime = time;
            }

            this.request.processTime = (time.getTime() - this.request.startTime.getTime());

            clearTimeout(this.checkResponseSent);

            this.update();
        });
    }

    insert() {
        if (this.skip) {
            return;
        }

        return RequestLog.create({
            ...this.request
        });
    }

    update() {
        if (this.skip) {
            return;
        }
        this.uploadFileToS3();

        return RequestLog.update({
            ...this.request
        }, {
            where: {
                id: this.request.id
            }
        });
    }

    uploadFileToS3() {
        try {
            service.aws.uploadRequestLogFile(
                this.request.id,
                this.request.startTime.toISOString(),
                JSON.stringify(this.request)
            );
        } catch (e) {
            console.log(e);
        }
    }
}
