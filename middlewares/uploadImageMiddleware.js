const multer = require("multer");
const ApiError = require("../utils/APIError");

const multerOptions = () => {
  // const multerStorage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "uploads/categories");
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split("/")[1];
  //     const filename = `category-${Date.now()}.${ext}`;
  //     cb(null, filename);
  //   },
  // });

  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Not an image! Please upload only images.", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};



exports.uploadSingleImage = (filedName) => multerOptions().single(filedName);

exports.uploadMultipleImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
