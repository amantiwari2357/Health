const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");


const { connectDB } = require("./DB/ConnectDatabase");
const CategoryRouter = require("./Routes/categoryRoutes");
const SubcategoryRouter = require("./Routes/SubcategoryRouter");
const ProductRouter = require("./Routes/ProductRoutes");
const UserRouter = require("./Routes/UserRouter");
const CheckoutRouter = require("./Routes/CheckoutRouter");
const BannerRouter = require("./Routes/BannerRouter");
const PincodeRouter = require("./Routes/PincodeRouter");
const ContactRouter = require("./Routes/contactRoutes");
const ArticleRouter = require("./Routes/ArticleRouter");
const EventRouter = require("./Routes/EventRoutes");
const VouchersRouter = require("./Routes/VocherRouter");
const ReviewRouter = require("./Routes/ReviewRouter");
const app = express();

// Allowed origins (your frontend domains)
app.use(cors({
    origin: (origin, callback) => {
        console.log("Origin attempting CORS:", origin);
        callback(null, true);
    },
    credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet()); // Set secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Sanitize user input to prevent XSS
app.use(hpp()); // Prevent HTTP Parameter Pollution

app.set(express.static("./Public"));

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Routes
app.use("/api", CategoryRouter); //2
app.use("/api", SubcategoryRouter); //3
app.use("/api", ProductRouter); //4
app.use("/api", UserRouter); // 1
app.use("/api", CheckoutRouter);
app.use("/api", BannerRouter); //5
app.use("/api", PincodeRouter); //6
app.use("/api", ContactRouter);
app.use("/api", ArticleRouter);
app.use("/api/events", EventRouter)
app.use("/api/coupon", VouchersRouter)
app.use("/api/review",ReviewRouter)
// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT} port`);
});

connectDB();
