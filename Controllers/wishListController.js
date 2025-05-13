const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UsersModel");
const factory = require("./handlerFactory");

exports.addToWishList = asyncHandler(async (req, res, next) => {
  // addToset add product to wishlist if it is not already added
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added to wishlist",
  });
});

exports.removeFromWishList = asyncHandler(async (req, res, next) => {
  // pull removes product from wishlist
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { wishList: req.params.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product removed from wishlist",
  });
});

exports.getWishList = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).populate("wishList");
  res.status(200).json({
    result: user.wishList.length,
    status: "success",
    data: user.wishList,
  });
});