const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setProductUserIds,
    reviewController.createNewReview
  );

router
  .route('/:id')
  .get()
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);
module.exports = router;
