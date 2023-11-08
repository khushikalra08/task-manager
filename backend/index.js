require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
//express app
const app = express();
const port = process.env.PORT || 4000;
const MONGO_URI =process.env.MONGO_URI
// middleware
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable CORS credentials if needed (cookies, authorization headers)
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);
// connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
