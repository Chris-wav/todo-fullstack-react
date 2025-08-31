const cors = require("cors");
const corsMiddleware = cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
});

module.exports = corsMiddleware;
