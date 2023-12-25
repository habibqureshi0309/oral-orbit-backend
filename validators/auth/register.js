const { check } = require('express-validator');

module.exports = [
    check('user_name').exists().withMessage('Enter valid first name.'),
    check('email').isEmail().withMessage('Enter valid email.'),
    check('password').isLength({ min: 5 }).withMessage('Password should be minimum 5 characters.'),
    // check('user_confirm_password').isLength({ min: 5 }).withMessage('Password should be minimum 5 characters.')
    //     .custom((val, { req }) => {
    //         if (val !== req.body.user_password) {
    //             throw new Error('Password should match confirm password')
    //         }

    //         return val;
    //     })
]