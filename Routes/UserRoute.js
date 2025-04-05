const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changePassword,
  getLoggedUser,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUser,
  activateUser,
} = require("../Controllers/UserControllers");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
} = require("../Utils/validators/userValidator");
const authService = require("./../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users (Admin Only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */
router
  .route("/")
  .get(authService.protect, authService.allowedTo("admin"), getUsers)
  .post(
    authService.protect,
    authService.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  );

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID (Admin Only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful response
 */
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTo("admin"),
    getUserValidator,
    getUserById
  )
  .put(
    authService.protect,
    authService.allowedTo("admin"),
    updateUserValidator,
    uploadUserImage,
    resizeImage,
    updateUser
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteUserValidator,
    deleteUser
  );

/**
 * @swagger
 * /users/changePassword/{id}:
 *   put:
 *     summary: Change user password
 *     description: Change a specific user's password (Admin Only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.route("/changePassword/:id").put(changePassword);

/**
 * @swagger
 * /users/GetMe:
 *   get:
 *     summary: Get logged-in user
 *     description: Retrieve details of the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/GetMe", authService.protect, getLoggedUser, getUserById);

/**
 * @swagger
 * /users/changeMyPassword:
 *   put:
 *     summary: Change logged-in user's password
 *     description: Update the password of the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.put("/changeMyPassword", authService.protect, updateLoggedUserPassword);

/**
 * @swagger
 * /users/updateMe:
 *   put:
 *     summary: Update logged-in user's data
 *     description: Modify profile details of the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User data updated successfully
 */
router.put(
  "/updateMe",
  authService.protect,
  updateLoggedUserValidator,
  updateLoggedUserData
);

/**
 * @swagger
 * /users/deleteMe:
 *   delete:
 *     summary: Delete logged-in user
 *     description: Deactivate the currently logged-in user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/deleteMe", authService.protect, deleteLoggedUser);

/**
 * @swagger
 * /users/activateMe:
 *   put:
 *     summary: Activate logged-in user
 *     description: Reactivate the currently logged-in user's account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User activated successfully
 */
router.put("/activateMe", authService.protect, activateUser);

module.exports = router;
