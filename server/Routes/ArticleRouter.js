const { createEvent, getAllEvents, updateEvent, getEventById, deleteEvent } = require("../Controller/ArticleController")
const upload = require("../Middlewares/Multer")

const EventsRouter = require("express").Router()

EventsRouter.post("/add-events", upload.single("eventImage"), createEvent)
EventsRouter.get("/all-events", getAllEvents)
EventsRouter.get("/get-single-events/:id", getEventById)
EventsRouter.put("/update-events/:id", upload.single("eventImage"), updateEvent)
EventsRouter.delete("/delete-events/:id", deleteEvent)


module.exports = EventsRouter