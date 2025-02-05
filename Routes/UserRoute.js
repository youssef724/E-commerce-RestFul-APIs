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
} = require("../Controllers/UserControllers");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../Utils/validators/userValidator");

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router.route("/changePassword/:id").put(changePassword);

router
  .route("/:id")
  .get(getUserValidator, getUserById)
  .put(updateUserValidator, uploadUserImage, resizeImage, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
