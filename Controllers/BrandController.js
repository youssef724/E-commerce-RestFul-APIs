const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../Models/BrandModel");
const ApiError = require("../utils/APIError");

exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ brand : brands.length, page, data: brands });
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
    { _id: req.params.id },
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

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await BrandModel.findByIdAndDelete(req.params.id);
  if (!brand) {
    return next(
      new ApiError(`Brand not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: brand });
});
