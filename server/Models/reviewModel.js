const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review