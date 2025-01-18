const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/CategoryModel");
const ApiError = require("../utils/APIError");

exports.getAllCategory = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({category: categories.length , page ,  data: categories});
});

exports.getCategoryById = asyncHandler(async (req, res , next) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(new ApiError(`Category not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({data: category });
});
 
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({data: category });
});

exports.updateCategory = asyncHandler(async (req, res , next) => {
  const name = req.body.name;   
  const category = await CategoryModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`Category not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({data: category });
}); 

exports.deleteCategory = asyncHandler(async (req, res , next) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new ApiError(`Category not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({data: category });
});
