const e = require("express");
const ApiError = require("../utils/APIError");
const ApiFeatures = require("../Utils/apiFeatures");
const asyncHandler = require("express-async-handler");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(
        new ApiError(`Document not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`Document not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });


exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(`Document not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model , ModelName = " ") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if(req.filterObj){
      filter = req.filterObj;
    }
    const countDocuments = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .search(ModelName)
      .limit()
      .sort()
      .paginate(countDocuments);
    const { MongooseQuery, paginationResult } = apiFeatures;
    const documents = await MongooseQuery;
    res
      .status(200)
      .json({ brand: documents.length, paginationResult, data: documents });
  });
