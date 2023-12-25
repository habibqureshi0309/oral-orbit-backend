const bcrypt = require("bcrypt");

module.exports = payload => {
    return bcrypt.hashSync(
        payload,
        bcrypt.genSaltSync(8), null
    );
}
