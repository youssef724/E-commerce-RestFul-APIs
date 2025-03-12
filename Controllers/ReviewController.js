const ReviewModel = require("../Models/ReviewModel");
const factory = require("./handlerFactory");

exports.createFilterObject = (req, res, next) => {
  let filter = {};
  if (req.params.productId) {
    filter = { product: req.params.productId };
  }
  req.filter = filter;
  next();
};

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.productId) {
    req.body.productId = req.params.productId;
  }
  if (!req.body.user) {
    req.body.user = req.user._id;
  }
  next();
};

exports.getReviews = factory.getAll(ReviewModel);

exports.getReviewById = factory.getOne(ReviewModel);

exports.createReview = factory.createOne(ReviewModel);

exports.updateReview = factory.updateOne(ReviewModel);

exports.deleteReview = factory.deleteOne(ReviewModel);
