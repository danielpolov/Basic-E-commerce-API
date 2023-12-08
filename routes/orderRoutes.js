const express = require('express');
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');

const router = express.Router();

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(
    //authController.protect,
    //authController.restrictTo('user'),
    //orderController.setUserId,
    orderController.createNewOrder
  );

router.route('/:id').get(orderController.getOrder);

module.exports = router;
