module.exports = (err, req, res, next) => {
    if (req.tracker) {
        req.tracker.setError({
            message: err.message,
            stack: err.stack
        });
    }

    if (err.handle) {
        return err.handle({ req, res, next });
    }

    if (err.name === 'JsonWebTokenError') {
        err.status = 401;
    }

    if (err && err.name === 'SequelizeDatabaseError') {
        return (new SequelizeErrorHandle(err)).handle({ req, res, next });
    }

    if (err && err.name === 'SequelizeUniqueConstraintError') {
        return (new SequelizeErrorHandle(err)).handle({ req, res, next });
    }

    return res.status(err.status || 417).json({
        message: __({
            phrase: err.message,
            locale: req.param.locale
        }),
        error: err
        // error: req.app.get('env') === 'development' ? err : undefined
    });
}