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
    }
  ],
  eventVideo:{
    type: String
  }
});

const EventModel=mongoose.model("EventModel",EventSchema)
module.exports = EventModel;

