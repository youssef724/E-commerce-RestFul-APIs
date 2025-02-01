const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const BrandModel = require("../Models/BrandModel");
const factory = require("./handlerFactory");
const ApiError = require("../utils/APIError");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  //save image filename into DB
  req.body.image = filename;

  next();
});

exports.getBrands = factory.getAll(BrandModel);

exports.getBrandById = factory.getOne(BrandModel);

exports.createBrand = factory.createOne(BrandModel);

exports.updateBrand = factory.updateOne(BrandModel);

exports.deleteBrand = factory.deleteOne(BrandModel);
