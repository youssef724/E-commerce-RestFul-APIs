const express = require("express");

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../Controllers/couponController");

const authService = require("../Controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Manage discount coupons
 */

router.use(authService.protect, authService.allowedTo("admin", "manager"));

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all coupons
 */
router.route("/").get(getCoupons);

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: integer
 *                 description: Discount percentage or amount
 *               expirationDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Coupon created successfully
 */
router.route("/").post(createCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a specific coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon
 *     responses:
 *       200:
 *         description: Returns the coupon details
 */
router.route("/:id").get(getCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: integer
 *                 description: Discount percentage or amount
 *               expirationDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 */
router.route("/:id").put(updateCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to be deleted
 *     responses:
 *       204:
 *         description: Coupon deleted successfully
 */
router.route("/:id").delete(deleteCoupon);

module.exports = router;
