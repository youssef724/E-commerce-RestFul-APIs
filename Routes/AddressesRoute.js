const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAddress,
  removeAddress,
} = require("../Controllers/addresessController");

const authService = require("../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Manage user addresses
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Add a new address
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added successfully
 */
router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get user addresses
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user addresses
 */
router
  .route("/")
  .get(authService.protect, authService.allowedTo("user"), getAddress);

/**
 * @swagger
 * /addresses/{addressId}:
 *   delete:
 *     summary: Remove an address
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address to delete
 *     responses:
 *       204:
 *         description: Address removed successfully
 */
router
  .route("/:addressId")
  .delete(authService.protect, authService.allowedTo("user"), removeAddress);

module.exports = router;
