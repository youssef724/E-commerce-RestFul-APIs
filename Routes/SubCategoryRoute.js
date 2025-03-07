const express = require("express");

const {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObject,
} = require("../Controllers/subCategoryControllers");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../Utils/validators/subcategoryValidator");

const router = express.Router({ mergeParams: true });
const authService = require("./../Controllers/authController");

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObject, getAllSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
