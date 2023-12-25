module.exports = () => {
    if (config.base_url.indexOf('tppl-test') !== -1) {
        return 'tppl-test';
    }

    if (config.base_url.indexOf('tppl') !== -1) {
        return 'tppl';
    }

    if (config.base_url.indexOf('nightly') !== -1) {
        return 'nightly';
    }

    if (config.base_url.indexOf('release') !== -1) {
        return 'release';
    }

    if (config.base_url.indexOf('localhost') !== -1) {
        return 'dev';
    }

    return 'production';
}