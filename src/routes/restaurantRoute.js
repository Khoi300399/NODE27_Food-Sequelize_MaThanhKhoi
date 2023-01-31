const express = require("express");
const restaurantRoute = express.Router();

const {
  getLikeById,
  getRateById,
  toggleLike,
  rate,
} = require("../controllers/restaurantController.js");

// Tạo API phương thức GET
restaurantRoute.get("/like/:id", getLikeById);

// Tạo API phương thức GET
restaurantRoute.get("/rate/:id", getRateById);

// Tạo API phương thức POST
restaurantRoute.post("/like/:id", toggleLike);

// Tạo API phương thức POST
restaurantRoute.post("/rate/:id", rate);

module.exports = restaurantRoute;
