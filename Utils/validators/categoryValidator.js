const { param, body, validationResult, check } = require("express-validator");
const validatoryMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 to 50 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatoryMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatoryMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];
