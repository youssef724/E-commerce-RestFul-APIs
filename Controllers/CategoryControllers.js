const multer = require("multer");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../Models/CategoryModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    //save image filename into DB
    req.body.image = filename;
  }

  next();
});

exports.getAllCategory = factory.getAll(CategoryModel);

exports.getCategoryById = factory.getOne(CategoryModel);

exports.createCategory = factory.createOne(CategoryModel);

exports.updateCategory = factory.updateOne(CategoryModel);

exports.deleteCategory = factory.deleteOne(CategoryModel);
