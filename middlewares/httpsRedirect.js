module.exports = (req, res, next) => {
    if (req.originalUrl.indexOf("ping") > -1 || req.hostname.indexOf("localhost") > -1) { //make sure to change the default health check URL on your ELB
        return next();
    } else {
        if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
            return res.redirect("https://" + req.get('Host') + req.url);
        } else {
            return next();
        }
    }
}