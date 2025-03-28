const mongoose = require("mongoose")

const VourchersSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    vouchersStatus: {
        type: Boolean,
        default: false
    }
})

const CouponCode = mongoose.model("CouponCode", VourchersSchema)

module.exports = CouponCode