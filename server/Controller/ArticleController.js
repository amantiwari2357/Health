const Events = require("../Models/ArticleModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");


// Create Event
const createEvent = async (req, res) => {
    try {
        const { eventName, eventHeading, eventDetails, eventsStatus } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Event image is required." });
        }

        const imageUrl = await uploadImage(req.file.path);
        deleteLocalFile(req.file.path);

        const newEvent = new Events({
            eventName,
            eventHeading,
            eventDetails,
            eventImage: imageUrl,
            eventsStatus: eventsStatus || false
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Failed to create event", error: error.message });
    }
};

// Get All Events
const getAllEvents = async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};

// Get Single Event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};

// Update Event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, eventHeading, eventDetails, eventsStatus } = req.body;

        const event = await Events.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        let imageUrl = event.eventImage;

        if (req.file) {
            imageUrl = await uploadImage(req.file.path);
            deleteLocalFile(req.file.path);
            if (event.eventImage) {
                await deleteImage(event.eventImage);
            }
        }

        event.eventName = eventName || event.eventName;
        event.eventHeading = eventHeading || event.eventHeading;
        event.eventDetails = eventDetails || event.eventDetails;
        event.eventImage = imageUrl;
        event.eventsStatus = eventsStatus !== undefined ? eventsStatus : event.eventsStatus;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Failed to update event", error: error.message });
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Events.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.eventImage) {
            await deleteImage(event.eventImage);
        }

        await event.deleteOne();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete event", error: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
