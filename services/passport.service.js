const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const findByToken = (token, done) => {
    service.jwt.verify(token, {}, async (err, payload) => {
        if (err) {
            return done(err);
        }

        const user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Role,
                include: [{
                    model: PermissionAccess,
                    include: [{
                        model: Permission
                    }]
                }],
            }, {
                model: GroupAccess,
                include: [{
                    model: Permission
                }],
                required: false
            }],
            where: {
                id: payload.id
            }
        });

        return done(null, user);
    });
}

const validateCredentials = async (email, password, next) => {
    try {
        const user = await User.findOne({
            attributes: ['id', 'email', 'password'],
            include: [{
                model: Company,
                as: 'Company',
                attributes: ['id']
            }],
            where: {
                [$op.or]: [{
                    email
                }, {
                    username: email
                }]
            },
        });

        if (!user || !helper.compareHash({ enteredPassword: password, userPassword: user.password })) {
            return next(
                {
                    message: 'Incorrect email id or password.'
                },
                false
            );
        }

        return next(
            null,
            {
                email: user.email,
                id: user.id,
                companyId: user.Company?.id || null
                // isAdmin: await helper.isSuperAdmin(user.id),
            },
            {
                message: 'Logged In Successfully'
            }
        );
    } catch (err) {
        return next(
            err,
            false
        );
    }
}

passport.use(new BearerStrategy(findByToken));
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, validateCredentials));

module.exports = passport;
module.exports.validateCredentials = validateCredentials;
