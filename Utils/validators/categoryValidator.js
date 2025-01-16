const { param, body, validationResult, check } = require("express-validator");
const validatoryMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 to 50 characters"),

  validatoryMiddleware
];
exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatoryMiddleware
];
exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatoryMiddleware,
]
