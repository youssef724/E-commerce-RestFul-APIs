const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../Models/CategoryModel");
const ApiError = require("../utils/APIError");
const ApiFeatures = require("../Utils/apiFeatures");
const factory = require("./handlerFactory");

exports.getAllCategory = asyncHandler(async (req, res) => {
  const countDocuments = await CategoryModel.countDocuments();

  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .filter()
    .search("category")
    .limit()
    .sort()
    .paginate(countDocuments);
  const { MongooseQuery, paginationResult } = apiFeatures;
  const categories = await MongooseQuery;

  res.status(200).json({ category: categories.length, paginationResult, data: categories });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(
      new ApiError(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: category });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(
      new ApiError(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: category });
});

exports.deleteCategory = factory.deleteOne(CategoryModel);