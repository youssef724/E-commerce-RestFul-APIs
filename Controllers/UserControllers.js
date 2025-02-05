const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const UserModel = require("../Models/UsersModel");
const factory = require("./handlerFactory");
const ApiError = require("../utils/APIError");
const bcrypt = require("bcryptjs");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadUserImage = uploadSingleImage("profileImage");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
  }

  //save image filename into DB
  req.body.profileImage = filename;

  next();
});

exports.getUsers = factory.getAll(UserModel);

exports.getUserById = factory.getOne(UserModel);

exports.createUser = factory.createOne(UserModel);

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      // Update the document with the new values except password
      name: req.body.name,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`Document not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      // Update the password
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`Document not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

exports.deleteUser = factory.deleteOne(UserModel);
