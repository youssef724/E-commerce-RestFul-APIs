const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../Models/BrandModel");
const ApiError = require("../utils/APIError");
const ApiFeatures = require("../Utils/apiFeatures");
const factory = require("./handlerFactory");

exports.getBrands = asyncHandler(async (req, res) => {
  const countDocuments = await BrandModel.countDocuments();

  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .filter()
    .search("Brand")
    .limit()
    .sort()
    .paginate(countDocuments);
  const { MongooseQuery, paginationResult } = apiFeatures;
  const brands = await MongooseQuery;
  res
    .status(200)
    .json({ brand: brands.length, paginationResult, data: brands });
});

exports.getBrandById = asyncHandler(async (req, res, next) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    return next(
      new ApiError(`Brand not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: brand });
});

exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const brand = await BrandModel.findOneAndUpdate(
     req.params.id, 
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(
      new ApiError(`Brand not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: brand });
});

exports.deleteBrand = factory.deleteOne(BrandModel);
