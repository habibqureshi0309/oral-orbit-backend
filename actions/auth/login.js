module.exports = (req, res, next) => {
        if (err) {
            return next(new BadError({ message: err.message }));
        }
        const token = service.jwt.issue({
            id: user.id,
            email: user.email
        });

        const refreshToken = service.jwt.refreshToken({
            id: user.id,
            email: user.email
        });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: config.maxRefreshAge
        });

        res.json({
            user, token
        });

}
