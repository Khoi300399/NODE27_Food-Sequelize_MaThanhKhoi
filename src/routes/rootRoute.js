const express = require("express");
const rootRoute = express.Router();
const userRoute = require("./userRoute.js");
const restaurantRoute = require("./restaurantRoute.js");

// sử dụng middleware của express
rootRoute.use("/user", userRoute);
rootRoute.use("/restaurant", restaurantRoute);

module.exports = rootRoute;
