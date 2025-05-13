const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const connectDB = require("./Config/DB");
const ApiError = require("./Utils/ApiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const mountRoutes = require("./Routes/Index.js");
const setupSwagger = require("./swagger.js");

//express app
const app = express();

// Mount Routes
mountRoutes(app);

//Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Development mode: ${process.env.NODE_ENV}`);
}

//setup swagger
setupSwagger(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route with ${req.originalUrl}`, 400));
});

//Global Error Handler Middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection errors: ${err.name} and ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
