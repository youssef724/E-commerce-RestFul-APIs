const mongoose = require('mongoose');
    const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// return image URL + image name

// Update , Get
BrandSchema.post("init", function (doc) {
  setImageUrl(doc);
});
// Create
BrandSchema.post("save", function (doc) {
  setImageUrl(doc);
});

module.exports = mongoose.model('Brand', BrandSchema);