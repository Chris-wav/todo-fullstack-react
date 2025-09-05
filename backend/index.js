const corsMiddleware = require("./middleware/cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;
const toDoRoutes = require("./routes/tasks.routes");

// Enable CORS for specific front-end origins
app.use(corsMiddleware);

// Parse incoming JSON requests
app.use(express.json());

// Mount todo routes
app.use("/api/todos/", toDoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(
  () => console.log("✅ Connection to MongoDB established"),
  (err) => console.log("❌ Failed to connect to MongoDB", err)
);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
