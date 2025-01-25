const { param, body, validationResult, check } = require("express-validator");
const validatoryMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 32 })
    .withMessage("Name must be between 3 to 32 characters"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("invalid id format"),
  validatoryMiddleware,
];

exports.updateSubCategoryValidator = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatoryMiddleware
];
exports.deleteSubCategoryValidator = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatoryMiddleware,
]
