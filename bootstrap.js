'use strict';
module.exports = {
    loadGlobals: app => {
        require(`${__dirname}/models`).bootstrap();
        require(`${__dirname}/middlewares`).bootstrap();
        require(`${__dirname}/errors`).bootstrap();
        require(`${__dirname}/validators`).bootstrap();
        require(`${__dirname}/actions`).bootstrap();

        const lodash = require('lodash');
        global._ = lodash;

        global.handle = key => {
            let handleValidator = validate;
            let handleAction = action;

            key.split('.').forEach(part => {
                handleValidator = handleValidator[part];
                handleAction = handleAction[part];
            });

            return [
                handleValidator,
                handleAction
            ]
        }
    },

    loadConfig: _ => {
        require(`${__dirname}/config`).bootstrap();
    },

    loadServices: app => {
        const services = require(`${__dirname}/services`);
        services.bootstrap(app);
    },

    loadRoutes: app => {
        require('./routes').bootstrap(app);
    },

    loadHelpers: app => {
        const helpers = require(`${__dirname}/helpers`);
        helpers.bootstrap(app);
    },

    loadParams: app => {
        app.use((req, res, next) => {
            req.param = {};

            Object.keys(req.query).forEach(param => {
                req.param[param] = req.query[param];

                if (req.param[param] === 'null') {
                    return req.param[param] = null;
                }
                if (req.param[param] === 'undefined') {
                    return req.param[param] = undefined;
                }
            });

            Object.keys(req.body).forEach(param => {
                req.param[param] = req.body[param];
            });

            req.param['locale'] = req.path.split('/')[2];

            next();
        });
    }
}
