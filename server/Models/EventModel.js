const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    default: "Event"
  },
  eventStatus: {
    type: Boolean,
    default: false
  },
  eventImages: [
    {
      type: String,
      required: true
    }
  ]
});

const EventModel=mongoose.model("EventModel",EventSchema)
module.exports = EventModel;

