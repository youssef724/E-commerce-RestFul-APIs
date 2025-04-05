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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account recovery
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.route("/signup").post(SignUpValidator, Signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 */
router.route("/login").post(LoginValidator, Login);

/**
 * @swagger
 * /auth/forGotPassword:
 *   post:
 *     summary: Request a password reset code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset code sent to email
 */
router.route("/forGotPassword").post(ForGotPassword);

/**
 * @swagger
 * /auth/verifyResetCode:
 *   post:
 *     summary: Verify the reset password code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               resetCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code verified successfully
 */
router.route("/verifyResetCode").post(verifyResetCode);

/**
 * @swagger
 * /auth/resetPassword:
 *   put:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               newPassword:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.route("/resetPassword").put(resetPassword);

module.exports = router;
