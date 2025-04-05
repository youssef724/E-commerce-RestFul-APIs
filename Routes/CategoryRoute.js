const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("./../Controllers/CategoryControllers");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("./../Utils/validators/categoryValidator");

const subCategoryRoute = require("./SubCategoryRoute");
router.use("/:categoryId/subcategory", subCategoryRoute);

const authService = require("./../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing product categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 */
router
  .route("/")
  .get(getAllCategory)

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create a new category
   *     description: Only Admins and Managers can create new categories
   *     tags: [Categories]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       201:
   *         description: Category created successfully
   */
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve a specific category using its ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 */
router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)

  /**
   * @swagger
   * /categories/{id}:
   *   put:
   *     summary: Update category
   *     description: Admins and Managers can update a category
   *     tags: [Categories]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The category ID
   *     responses:
   *       200:
   *         description: Category updated successfully
   */
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )

  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Delete category
   *     description: Only Admins can delete categories
   *     tags: [Categories]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The category ID
   *     responses:
   *       200:
   *         description: Category deleted successfully
   */
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
