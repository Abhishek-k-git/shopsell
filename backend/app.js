const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

// config
require("dotenv").config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(bodyParser.urlencoded({ extended: true, limit: "55mb" }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.get("/api/testing", (req, res) => {
  res.end("api is working...");
});

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

app.use("/api/v1/user", user);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use("/api/v1/order", order);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/event", event);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/withdraw", withdraw);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
