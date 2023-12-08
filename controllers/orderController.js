const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const factory = require('./../controllers/handlerFactory');
const Order = require('./../models/ordersModel');

exports.getAllOrders = catchAsync(async (req, res, next) =>{

  const orders = await Order.find();

  res.status(200).json({
    status: 'success',
    data:{
      orders,
    },
  });

});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.createNewOrder = factory.createOne(Order);

exports.setUserId = async (req, res, next) => {
  console.log(req.body);
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    req.body.user = decoded.id;
  }
  next();
};
