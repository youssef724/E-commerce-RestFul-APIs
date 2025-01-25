const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../Models/subCategoryModel");
const ApiError = require("../utils/APIError");
const { param } = require("../Routes/SubCategoryRoute");
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subCategory });
});
exports.createFilterObject = (req , res , next) => {
    let filter = {};
    if (req.params.categoryId) {
      filter = { category: req.params.categoryId };
    }
    req.filter = filter;
    next();
}
exports.getAllSubCategory = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const Subcategories = await subCategoryModel
    .find(req.filter)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ category: Subcategories.length, page, data: Subcategories });
});

exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const Subcategory = await subCategoryModel
    .findById(req.params.id)
    .populate({ path: "category", select: "name -_id" });
  if (!Subcategory) {
    return next(
      new ApiError(`Subcategory not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: Subcategory });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const { id } = req.params;
  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(
      new ApiError(`Sub Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: subCategory });
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const Subcategory = await subCategoryModel.findByIdAndDelete(req.params.id);
  if (!Subcategory) {
    return next(
      new ApiError(`Sub Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: Subcategory });
});
