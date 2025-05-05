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

// Routers
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

// ✅ CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true); // Allow non-browser requests (like curl, Postman)
        }
        console.log("Origin attempting CORS:", origin);
        return callback(null, true); // Allow all origins
    },
    credentials: true,
}));

// Logging
app.use(morgan("dev"));

// Cookie parser
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Serve static files
app.use(express.static("./Public"));

// Root route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// API Routes
app.use("/api", CategoryRouter);
app.use("/api", SubcategoryRouter);
app.use("/api", ProductRouter);
app.use("/api", UserRouter);
app.use("/api", CheckoutRouter);
app.use("/api", BannerRouter);
app.use("/api", PincodeRouter);
app.use("/api", ContactRouter);
app.use("/api", ArticleRouter);
app.use("/api/events", EventRouter);
app.use("/api/coupon", VouchersRouter);
app.use("/api/review", ReviewRouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT} port`);
});

// Connect to DB
connectDB();
