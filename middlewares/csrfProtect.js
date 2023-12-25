const csrf = require('csurf');
module.exports = csrf({ cookie: { sameSite: 'none', httpOnly: true, secure: true } })