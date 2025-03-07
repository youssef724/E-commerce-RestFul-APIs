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
  activateUser
} = require("../Controllers/UserControllers");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
} = require("../Utils/validators/userValidator");
const authService = require("./../Controllers/authController");

// logged users
router.get("/GetMe", authService.protect, getLoggedUser, getUserById);
router.put("/changeMyPassword", authService.protect, updateLoggedUserPassword);
router.put(
  "/updateMe",
  authService.protect,
  updateLoggedUserValidator,  
  updateLoggedUserData
);
router.delete("/deleteMe", authService.protect, deleteLoggedUser);
router.put("/activateMe", authService.protect, activateUser);

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

router.route("/changePassword/:id").put(changePassword);

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

module.exports = router;
