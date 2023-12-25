const jwt = require('jsonwebtoken');

exports.issue = (payload = {}, options = {}) => {
    return jwt.sign(payload, config.tokenSecret, {
        expiresIn: config.maxTokenAge,
        ...options
    });
}

exports.refreshToken = (payload = {}, options = {}) => {
    return jwt.sign(payload, config.tokenSecretRefresh, {
        expiresIn: config.maxRefreshAge,
        ...options
    });
}

exports.verify = (token, options = {}, next) => {
    return jwt.verify(
        token,
        config.tokenSecret,
        options,
        next
    );
}

exports.verifyRefreshToken = (token, options, next) => {
    return jwt.verify(
        token,
        config.tokenSecretRefresh,
        options,
        next
    );
}

exports.decode = (token, options = {}) => {
    return jwt.decode(token, options);
}