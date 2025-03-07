const { param, body, validationResult, check } = require("express-validator");
const validatoryMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const User = require("../../Models/UsersModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];
exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be between 3 to 50 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number"),

  check("profilePicture").optional(),
  check("role").optional(),
  validatoryMiddleware,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number"),

  check("profilePicture").optional(),
  check("role").optional(),
  validatoryMiddleware,
];

// Another way to check password with custom validator
// invoke changePasswordValidator into routes
exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("Current Password is required"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      //1) Check if the password is correct
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Current password is incorrect");
      }
      //2) check if the new password is the same as the confirm password
      if (password !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  validatoryMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid id format"),
  validatoryMiddleware,
];

exports.updateLoggedUserValidator = [
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number"),
  // check("profilePicture").optional(),
  // check("role").optional(),
  validatoryMiddleware,
];
