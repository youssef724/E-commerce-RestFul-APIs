const ApiError = require("../utils/APIError");
const ApiFeatures = require("../Utils/apiFeatures");
const asyncHandler = require("express-async-handler");

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(
        new ApiError(`Document not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
});
