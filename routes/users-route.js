const express = require("express");
const { check } = require("express-validator");

const usercontroller = require("../controller/user-controller");
const router = express.Router();

router.get("/", usercontroller.getallUsers);
router.get("/:uid", usercontroller.getuserbyId);
router.post(
  "/signup",
  [
    check("firstname").notEmpty(),
    check("lastname").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usercontroller.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usercontroller.login
);

module.exports = router;
