const express = require("express");
const router = express.Router();
const {
  Signup,
  Login
} = require("../Controllers/authController");

const {
  SignUpValidator,
  LoginValidator
} = require("../Utils/validators/authValidator");

router.route("/signup").post(SignUpValidator, Signup);
router.route("/login").post(LoginValidator, Login);

module.exports = router;
 