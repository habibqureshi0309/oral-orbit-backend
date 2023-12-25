const express = require("express");
const router = express.Router();

router.route("/register").post(middleware.csrfProtect, handle("auth.register"));

// router.route("/login").post(middleware.csrfProtect, handle("auth.login"));

// router.route("/driver").get(action.driver.getDriverByPhone);
// router.route("/refresh").post(action.auth.refresh);
router.get("/csrftoken", middleware.csrfProtect, action.auth.csrf);

// router.route("/login/drivers").get(handle("auth.driverLogin"));
// router.route("/me").get(middleware.isAuthenticated, action.auth.me);

// router.route('/forgot-pass').post(action.auth.forgotPassword);

module.exports.router = router;
module.exports.basePath = "auth";
module.exports.excludeMiddlewares = true;
