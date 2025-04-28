const Review = require("../Models/reviewModel");

const createReview = async (req, res) => {
    try {
        const { review,location,author } = req.body || {};
        if(!review || !location || !author){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newReview = new Review({ review,location,author });
        await newReview.save();
        res.status(200).json({ message: "Review created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while creating the review" });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching the reviews" });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting the review" });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { review,location,author } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, { review,location,author }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while updating the review" });
    }
};

const getReviewById = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while fetching the review" });
    }
  };



module.exports = { createReview, getAllReviews, deleteReview, updateReview,getReviewById };