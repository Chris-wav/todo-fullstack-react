const cors = require("cors");

// Allow requests only from these front-end origins
const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://todo-fullstack-react.onrender.com",
  ]
});

module.exports = corsMiddleware;
