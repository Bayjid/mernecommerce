//Express Setup
require('express-async-errors');
const express = require("express");
const app = express();
const path = require("path");

//Others Package
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


//App Setup
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const productAdmin = require("./routes/productAdminRoute");
const auth = require("./routes/authRoute");
const review = require("./routes/reviewRoute");
const order = require("./routes/orderRoute");
const orderAdmin = require("./routes/orderAdminRoute");
const payment = require("./routes/paymentRoute");
const user = require("./routes/userRoute");
const userAdmin = require("./routes/userAdminRoute");

// Joining Route With App
app.use("/api/v1", product);
app.use("/api/v1", productAdmin);
app.use("/api/v1", auth);
app.use("/api/v1", review);
app.use("/api/v1", order);
app.use("/api/v1", orderAdmin);
app.use("/api/v1", payment);
app.use("/api/v1", user);
app.use("/api/v1", userAdmin);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Route not found
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
app.use(notFoundMiddleware);

// Middleware for Errors
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Exports
module.exports = app;