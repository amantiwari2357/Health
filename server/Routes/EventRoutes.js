const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../Controller/EventController")
const upload = require("../Middlewares/Multer")

const EventRouter = require("express").Router()

EventRouter.post("/create-event", upload.array("eventImages", 10), createEvent)
EventRouter.get("/all-event", getAllEvents)
EventRouter.get("/single-event/:id", getEventById)
EventRouter.put("/update-event/:id", upload.array("eventImages",10), updateEvent)
EventRouter.delete("/delete-event/:id", deleteEvent)

module.exports = EventRouter