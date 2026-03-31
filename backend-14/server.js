const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/customers", require("./routes/customerRoute.js"));

// Server
app.listen(5000, () => console.log("Server running on port 5000"));