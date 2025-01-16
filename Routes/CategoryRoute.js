const express = require("express");
const router = express.Router();
const {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./..//Controllers/CategoryControllers");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("./../Utils/validators/categoryValidator");

router
  .route("/")
  .get(getCategory)
  .post(createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
