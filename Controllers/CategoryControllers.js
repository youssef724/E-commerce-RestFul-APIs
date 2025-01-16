const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/CategoryModel");

exports.getCategory = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({category: categories.length , page ,  data: categories});
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    res.status(404).json({message: "Category not found"});
  }
  res.status(200).json({data: category });
});
 
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({data: category });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;   
  const category = await CategoryModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(200).json({data: category });
}); 

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404).json({message: "Category not found"});
  }
  res.status(200).json({data: category });
});
