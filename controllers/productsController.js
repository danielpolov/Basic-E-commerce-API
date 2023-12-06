const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productsModel');
const factory = require('./handlerFactory');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    quantity: products.length,
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews');

  res.status(200).json({
    status: 'success',
    product,
  });
});

exports.updateProduct = factory.updateOne(Product);

exports.createNewProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);
