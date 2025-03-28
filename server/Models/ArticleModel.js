const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventHeading: {
        type: String,
        required: true
    },
    eventDetails: {
        type: String,
        required: true
    },
    eventImage: {
        type: String,
        required: true
    },
    eventsStatus:{
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Events = mongoose.model("Events", EventSchema)

module.exports = Events