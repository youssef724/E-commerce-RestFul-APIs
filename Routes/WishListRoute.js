const express = require("express");
const router = express.Router();
const {
  addToWishList,
  removeFromWishList,
  getWishList,
} = require("../Controllers/wishListController");

// const {

// } = require("../Utils/validators/brandValidator");

const authService = require("./../Controllers/authController");

router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addToWishList);

router
  .route("/:productId")
  .delete(
    authService.protect,
    authService.allowedTo("user"),
    removeFromWishList
  );

router
  .route("/")
  .get(authService.protect, authService.allowedTo("user"), getWishList);
module.exports = router;
