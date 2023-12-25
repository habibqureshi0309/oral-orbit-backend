module.exports = async (req, res, next) => {
    try {
        const userData = {
            username: req.body.title,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            designation: req.body.designation,
            working_since: req.body.working_since,
        }

        const userExists = await service.user.userExists({
            user_email: req.body.email
        });

        if (!userExists) {
            return next(new BadError({ message: 'No user exists' }));
        }

        const user = await User.update(userData, {
            where: {
                email: userData?.email
            },
            returning: true,
        });

        return res.json({
            message: 'User information updated successfully',
            user: user,
        });
    } catch (e) { next(e); }
}