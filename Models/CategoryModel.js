const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a category name"],
    unique: [true , "Category name must be unique"],
    minlength: [3, "Category name must be at least 3 characters long"],
    maxlength: [30, "Category name must be at most 30 characters long"]
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image:{
    type: String,

  }

} , {timestamps: true});

module.exports = mongoose.model("Category", CategorySchema);
