const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be at most 100 characters long"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      minlength: [20, "Description must be at least 3 characters long"],
      maxlength: [1000, "Description must be at most 1000 characters long"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a quantity"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      trim: true,
      max: [100000, "Price must be at most 20 characters long"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Please provide a cover image"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a Category"],
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
        required: [true, "Product must belong to a SubCategory"],
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imageList = [];
    doc.images.forEach((image, index) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imageList.push(imageUrl);
    });

    doc.images = imageList;
  }
};
// return image URL + image name

// Update , Get
productSchema.post("init", function (doc) {
  setImageUrl(doc);
});
// Create
productSchema.post("save", function (doc) {
  setImageUrl(doc);
});
module.exports = mongoose.model("Product", productSchema);
