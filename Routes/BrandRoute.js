const express = require("express");
const router = express.Router();
const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../Controllers/BrandController");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../Utils/validators/brandValidator");

const authService = require("./../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoints to manage brands
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of brands
 */
router
  .route("/")
  .get(getBrands)

  /**
   * @swagger
   * /brands:
   *   post:
   *     summary: Create a new brand
   *     tags: [Brands]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       201:
   *         description: Brand created successfully
   */
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand retrieved
 */
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)

  /**
   * @swagger
   * /brands/{id}:
   *   put:
   *     summary: Update a brand
   *     tags: [Brands]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The brand ID
   *     responses:
   *       200:
   *         description: Brand updated successfully
   */
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )

  /**
   * @swagger
   * /brands/{id}:
   *   delete:
   *     summary: Delete a brand
   *     tags: [Brands]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The brand ID
   *     responses:
   *       204:
   *         description: Brand deleted successfully
   */
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
