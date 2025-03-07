const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeProductImage,
} = require("./..//Controllers/ProductControllers");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("./../Utils/validators/productValidator");
const authService = require("./../Controllers/authController");

router
  .route("/")
  .get(getAllProducts)
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImage,
    resizeProductImage,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImage,
    resizeProductImage,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
