const express = require('express');
const productController = require('./../controllers/productsController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createNewProduct); // in the future restrict to Admin

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
