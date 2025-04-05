const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  createFilterObject,
  setProductIdAndUserIdToBody,
} = require("../Controllers/ReviewController");

const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../Utils/validators/ReviewValidator");

const authService = require("../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Manage product reviews
 */

/**
 * @swagger
 * /products/{productId}/reviews:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Returns a list of reviews for the product
 */
router.route("/").get(createFilterObject, getReviews);

/**
 * @swagger
 * /products/{productId}/reviews:
 *   post:
 *     summary: Create a new review for a product
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating given by the user
 *               comment:
 *                 type: string
 *                 description: Review comment
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   get:
 *     summary: Get a specific review by ID
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Returns the review details
 */
router.route("/:id").get(getReviewById);

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating given by the user
 *               comment:
 *                 type: string
 *                 description: Review comment
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router
  .route("/:id")
  .put(
    authService.protect,
    authService.allowedTo("user"),
    updateReviewValidator,
    updateReview
  );

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     responses:
 *       204:
 *         description: Review deleted successfully
 */
router
  .route("/:id")
  .delete(
    authService.protect,
    authService.allowedTo("admin", "user", "manager"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
