const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [30, "Category name must be at most 30 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// return image URL + image name

// Update , Get
CategorySchema.post("init", function (doc) {
  setImageUrl(doc);
});
// Create
CategorySchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
