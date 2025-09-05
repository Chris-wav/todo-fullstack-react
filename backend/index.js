const corsMiddleware = require("./middleware/cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // <--- για static serve
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const toDoRoutes = require("./routes/tasks.routes");

// Enable CORS for specific front-end origins
app.use(corsMiddleware);

// Parse incoming JSON requests
app.use(express.json());

// Mount todo routes
app.use("/api/todos", toDoRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/todo-frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/todo-frontend/dist/index.html")
  );
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(
  () => console.log("✅ Connection to MongoDB established"),
  (err) => console.log("❌ Failed to connect to MongoDB", err)
);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
