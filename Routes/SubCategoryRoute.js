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

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: Manage subcategories for products
 */

/**
 * @swagger
 * /categories/{categoryId}/subcategories:
 *   get:
 *     summary: Get all subcategories for a category
 *     tags: [SubCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Returns a list of subcategories for the category
 */
router.route("/").get(createFilterObject, getAllSubCategory);

/**
 * @swagger
 * /categories/{categoryId}/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 */
router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  );

/**
 * @swagger
 * /categories/{categoryId}/subcategories/{id}:
 *   get:
 *     summary: Get a specific subcategory by ID
 *     tags: [SubCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subcategory
 *     responses:
 *       200:
 *         description: Returns the subcategory details
 */
router.route("/:id").get(getSubCategoryValidator, getSubCategoryById);

/**
 * @swagger
 * /categories/{categoryId}/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [SubCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the subcategory
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 */
router
  .route("/:id")
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  );

/**
 * @swagger
 * /categories/{categoryId}/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [SubCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subcategory
 *     responses:
 *       204:
 *         description: Subcategory deleted successfully
 */
router
  .route("/:id")
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
