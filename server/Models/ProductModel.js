const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDiscountPercentage: {
        type: Number,
        default: 0
    },
    productFinalPrice: {
        type: Number,
        default: 0
    },
    stock: {
        type: String,
        required: true,
        enum: ["Available", "UnAvailable"]
    },
    tax: {
        type: Number,
        required: true
    },
    productImage: {
        type: [String],
        required: true
    },
    productStatus: {
        type: Boolean,
        default: false
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    productPdf: {
        type: String,
    },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product
