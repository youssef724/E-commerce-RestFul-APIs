const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UsersModel");
const factory = require("./handlerFactory");
const ApiError = require("../utils/APIError");

exports.addAddress = asyncHandler(async (req, res, next) => {
  // addToset add address if it is not already added
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address added",
  });
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
  // $pull => remove address object from user addresses array if addressId exist
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Address removed successfully.",
    data: user.addresses,
  });
});

exports.getAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).populate("addresses");
  res.status(200).json({
    result: user.addresses.length,
    status: "success",
    data: user.addresses,
  });
});
