const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAddress,
  removeAddress
} = require("../Controllers/addresessController");

// const {

// } = require("../Utils/validators/brandValidator");

const authService = require("../Controllers/authController");

router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addAddress);

router
  .route("/:addressId")
  .delete(
    authService.protect,
    authService.allowedTo("user"),
    removeAddress
  );

router
  .route("/")
  .get(authService.protect, authService.allowedTo("user"), getAddress);
module.exports = router;
