const corsMiddleware = require("./middleware/cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;
const toDoRoutes = require("./routes/tasks.routes");
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/todos/", toDoRoutes);

mongoose.connect(process.env.MONGO_URI).then(
  () => console.log("CONNECTION TO MONGO DB ESTABLISHED"),
  (err) => {
    console.log("FAILED TO CONNECT TO MONGODB");
  }
);

app.listen(port, () => {
  console.log("SERVER IS RUNNING");
});
