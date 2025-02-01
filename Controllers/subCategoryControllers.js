const subCategoryModel = require("../Models/subCategoryModel");

const factory = require("./handlerFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.createFilterObject = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  req.filter = filter;
  next();
};
exports.getAllSubCategory = factory.getAll(subCategoryModel);

exports.getSubCategoryById = factory.getOne(subCategoryModel);

exports.createSubCategory = factory.createOne(subCategoryModel);

exports.updateSubCategory = factory.updateOne(subCategoryModel);

exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
