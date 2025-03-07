const express = require("express");
const router = express.Router();
const {
  Signup,
  Login,
  ForGotPassword,
  verifyResetCode,
  resetPassword,
} = require("../Controllers/authController");

const {
  SignUpValidator,
  LoginValidator,
} = require("../Utils/validators/authValidator");

router.route("/signup").post(SignUpValidator, Signup);
router.route("/login").post(LoginValidator, Login);
router.route("/forGotPassword").post(ForGotPassword);
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").put(resetPassword);

module.exports = router;
