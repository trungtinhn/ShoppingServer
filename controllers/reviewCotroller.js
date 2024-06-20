const Review = require('../models/Review');
const User = require('../models/User')
const reviewController = {
    addReview: async (req, res) => {
        try {
            const newReview = new Review(req.body);
            await newReview.save();
            res.status(200).json('Created new review successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to create new review!', error });
        }
    },
    updateReview: async (req, res) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedReview);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update review!', error });
        }
    },
    deleteReview: async (req, res) => {
        try {
            await Review.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted review successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete review!', error });
        }
    },
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get reviews!', error });
        }
    },
    getReviewById: async (req, res) => {
        try {
            const reviews = await Review.find({ MaSP: req.params.id }).lean();
            
            if (reviews.length === 0) {
                return res.status(404).json('Review not found!');
            }
            
            const reviewsWithUserDetails = await Promise.all(reviews.map(async (review) => {
                const user = await User.findOne({ MaND: review.MaND });
                if (user) {
                    review.TenND = user.TenND;
                    review.Avatar = user.Avatar;
                } else {
                    // Handle case where user is not found
                    review.TenND = 'Unknown';
                    review.Avatar = ''; // Provide a default image if necessary
                }
                return review;
            }));
            
            console.log(reviewsWithUserDetails);
            res.status(200).json(reviewsWithUserDetails);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get review!', error });
        }
    }
    
};

module.exports = reviewController;
