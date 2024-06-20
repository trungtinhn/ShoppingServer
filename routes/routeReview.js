const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewCotroller");

router.post('/addReview', reviewController.addReview);
router.get('/getReviews', reviewController.getAllReviews);
router.get('/getReviewById/id=:id', reviewController.getReviewById);
router.put('/updateReview/id=:id', reviewController.updateReview);
router.delete('/deleteReview/id=:id', reviewController.deleteReview);

module.exports = router;
