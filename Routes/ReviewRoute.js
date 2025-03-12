const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  createFilterObject,
  setProductIdAndUserIdToBody
} = require("../Controllers/ReviewController");

const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../Utils/validators/ReviewValidator");

const authService = require("../Controllers/authController");

router
  .route("/")
  .get(createFilterObject, getReviews)
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewById)
  .put(
    authService.protect,
    authService.allowedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin", "user", "manager"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
