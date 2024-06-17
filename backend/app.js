// backend/app.js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// config
require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const contactRoutes = require("./routes/contactRoutes");
const aboutUs = require("./routes/aboutUs");

app.use("/api/se", product);
app.use("/api/se", user);
app.use("/api/se", order);
app.use("/api/se", payment);
app.use("/api/se", contactRoutes);
app.use("/api/se", aboutUs);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;

