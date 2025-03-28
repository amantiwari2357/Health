const EventModel = require("../Models/EventModel.js");
const { uploadImage, deleteImage } = require("../utils/Cloudnary.js");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");

const createEvent = async (req, res) => {
  try {
    const { eventStatus, eventName } = req.body;
    // if (!eventName) {
    //   return res.status(400).json({ message: "Event name is required" });
    // }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    if(req.files && req.files.length >10){
      return res.status(400).json({ message: "You can upload maximum 10 images" });
    }
       
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      const imageUrl = await uploadImage(req.files[i].path);
      if (imageUrl) {
        deleteLocalFile(req.files[i].path);
        images.push(imageUrl);
      }
    }

    if (!images || images.length === 0) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

    const newEvents = new EventModel({
      eventName,
      eventStatus: eventStatus,
      eventImages: images,
    });

    await newEvents.save();

    res.status(201).json({ message: "Events created successfully" });
  } catch (error) {
    console.error("Error creating events:", error);
    res.status(500).json({ message: "Server error while creating banner" });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching banners" });
  }
};

// Get Banner by ID
const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching the event" });
  }
};

// Update Events
const updateEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { eventName, eventStatus } = req.body;
    if (!eventName && !eventStatus && !req.files) {
      return res
        .status(400)
        .json({ message: "Please provide at least one field to update" });
    }
    if (eventName) {
      event.eventName = eventName;
    }
   
if(req.files && req.files.length >10){
  return res.status(400).json({ message: "You can upload maximum 10 images" });
}
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < event.eventImages.length; i++) {
        await deleteImage(event.eventImages[i]);
      }

      event.eventImages = [];
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = await uploadImage(req.files[i].path);
        if (imageUrl) {
          deleteLocalFile(req.files[i].path);
          event.eventImages.push(imageUrl);
        }
      }
    }

    if (eventStatus) {
      event.eventStatus = eventStatus;
    }

    await event.save();
    res.status(200).json({ message: "Events updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating the events" });
  }
};

// Delete Banner
const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    for (let i = 0; i < event.eventImages.length; i++) {
      await deleteImage(event.eventImages[i]);
    }

    await event.deleteOne();
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting the banner" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
