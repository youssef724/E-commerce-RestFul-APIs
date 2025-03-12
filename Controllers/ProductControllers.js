const ProductModel = require("../Models/ProductModel");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const factory = require("./handlerFactory");
const multer = require("multer");
const ApiError = require("../utils/APIError");

const {uploadMultipleImages} = require("../middlewares/uploadImageMiddleware");

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImage = uploadMultipleImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  console.log(req.files);
  // Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFilename = `product-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFilename}`);

    req.body.imageCover = imageCoverFilename;
  }

  // Image processing for images
  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (image, index) => {
        const imageName = `product-${Date.now()}-${index + 1}.jpeg`;
        await sharp(image.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }

  next();

});

exports.getAllProducts = factory.getAll(ProductModel, "Product");

exports.getProductById = factory.getOne(ProductModel, "reviews");

exports.createProduct = factory.createOne(ProductModel);

exports.updateProduct = factory.updateOne(ProductModel);

exports.deleteProduct = factory.deleteOne(ProductModel);
