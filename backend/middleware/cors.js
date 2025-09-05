const cors = require("cors");

// Allow requests only from these front-end origins
const corsMiddleware = cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
});

module.exports = corsMiddleware;
