const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UsersModel");
const ApiError = require("../utils/APIError");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ user: users.length, page, data: users });
});

