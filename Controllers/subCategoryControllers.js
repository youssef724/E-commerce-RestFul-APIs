const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../Models/subCategoryModel");
const ApiError = require("../utils/APIError");
const { param } = require("../Routes/SubCategoryRoute");
const ApiFeatures = require("../Utils/apiFeatures");
const factory = require("./handlerFactory");

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
exports.createFilterObject = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  req.filter = filter;
  next();
};
exports.getAllSubCategory = asyncHandler(async (req, res) => {
  const countDocuments = await subCategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
    .filter()
    .search("subCategory")
    .limit()
    .sort()
    .paginate(countDocuments);
  const { MongooseQuery, paginationResult } = apiFeatures;

  const Subcategories = await MongooseQuery;
  res
    .status(200)
    .json({
      category: Subcategories.length,
      paginationResult,
      data: Subcategories,
    });
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

exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
