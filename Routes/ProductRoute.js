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

const ReviewRoute = require("./ReviewRoute");
router.use("/:productId/reviews", ReviewRoute);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

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

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of all products
 */
router.route("/").get(getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router
  .route("/")
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

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Returns the product details
 */
router.route("/:id").get(getProductValidator, getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router
  .route("/:id")
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImage,
    resizeProductImage,
    updateProductValidator,
    updateProduct
  );

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */
router
  .route("/:id")
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
