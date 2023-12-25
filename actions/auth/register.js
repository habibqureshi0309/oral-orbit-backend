module.exports = async (req, res, next) => {
    try {
        const userData = {
            username: req.body.user_name,
            email: req.body.email,
            password: helper.makeHash(req.body.password),
            created_at: helper.moment().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: helper.moment().format("YYYY-MM-DD HH:mm:ss"),
        }

        const userExists = await service.user.userExists({
            user_email: userData.email
        });

        if (userExists) {
            return next(new BadError({ message: 'User already exists' }));
        }

        const user = await User.create(userData);

        const redirect_to = req.param.redirect_to || req.param.redirect;

        const token = service.jwt.issue({
            user_id: user.user_id,
            user_email: user.user_email
        });

        const refreshToken = service.jwt.refreshToken({
            id: user.user_id,
            email: user.user_email
        });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: config.maxRefreshAge
        });

        return res.json({
            message: 'User registered successfully',
            redirect: redirect_to,
            user: user,
            token: token
        });
    } catch (e) { next(e); }
}