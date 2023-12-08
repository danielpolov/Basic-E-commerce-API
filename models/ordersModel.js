const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  total: {
    type: Number,
    required: [true, 'Order must have a total'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a user'],
    },
  ],
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
