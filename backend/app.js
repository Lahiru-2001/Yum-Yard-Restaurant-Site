const express = require("express");
const path = require("path");
const cors = require("cors");
// Load environment variables from .env file
require("dotenv").config();
// Connect to the database
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const foodRoutes = require("./routes/foodRoutes");
app.use("/api/yumyard", foodRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});