const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
     resetToken: {  // New field for storing the reset token
        type: String,
        default: null,
    },
    resetTokenExpiration: {  // New field for storing token expiration time
        type: Date,
        default: null,
    },
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)

module.exports = User