const express = require("express");
const router = express.Router();
const {
  addToWishList,
  removeFromWishList,
  getWishList,
} = require("../Controllers/wishListController");

const authService = require("./../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: WishLists
 *   description: Manage user wishlists
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [WishLists]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the wishlist
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 */
router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addToWishList);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [WishLists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the wishlist
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 */
router
  .route("/:productId")
  .delete(
    authService.protect,
    authService.allowedTo("user"),
    removeFromWishList
  );

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all products in the user's wishlist
 *     tags: [WishLists]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of products in the user's wishlist
 */
router
  .route("/")
  .get(authService.protect, authService.allowedTo("user"), getWishList);

module.exports = router;
