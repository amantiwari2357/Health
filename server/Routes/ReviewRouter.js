const express = require("express");
const { createReview, getAllReviews, deleteReview, updateReview, getReviewById } = require("../Controller/ReviewController");
const ReviewRouter = express.Router();

ReviewRouter.post("/add-review", createReview);
ReviewRouter.get("/all-reviews", getAllReviews);
ReviewRouter.delete("/delete-review/:id", deleteReview);
ReviewRouter.put("/update-review/:id", updateReview);
ReviewRouter.get("/single-review/:id", getAllReviews);

module.exports = ReviewRouter;