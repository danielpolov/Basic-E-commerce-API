const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Supply an image for the product, please!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
