const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../Models/ProductModel");
const ApiError = require("../utils/APIError");
const ApiFeatures = require("../Utils/apiFeatures");
const factory = require("./handlerFactory");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const countDocuments = await ProductModel.countDocuments();    
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .filter()
    .search("Product")
    .limit()
    .sort()
    .paginate(countDocuments);
  const { MongooseQuery, paginationResult } = apiFeatures;
  const products = await MongooseQuery;
  res.status(200).json({ results: products.length, paginationResult, data: products });
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

exports.deleteProduct = factory.deleteOne(ProductModel);