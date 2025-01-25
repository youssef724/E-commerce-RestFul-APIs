const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const connectDB = require("./Config/DB");
const ApiError = require("./utils/APIError.js");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const CategoryRoute = require("./Routes/CategoryRoute");
const SubCategoryRoute = require("./Routes/SubCategoryRoute.js");
const BrandRoute = require("./Routes/BrandRoute.js");

//express app
const app = express();

//Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Development mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/subcategory", SubCategoryRoute);
app.use("/api/v1/brand", BrandRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route with ${req.originalUrl}`, 400));
});

//Global Error Handler Middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection errors: ${err.name} and ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
