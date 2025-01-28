const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../Models/ProductModel");
const ApiError = require("../utils/APIError");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({})
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name -_id",
    });
  res.status(200).json({ category: products.length, page, data: products });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(
      new ApiError(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: product });
});

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await ProductModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!product) {
    return next(
      new ApiError(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(
      new ApiError(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: product });
});
