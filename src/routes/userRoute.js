const express = require("express");
const userRoute = express.Router();

// import commonjs Module
// import hàm getUser từ thư mục controller
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  orderFoodfromUser,
  getLikeById,
  getRateById,
} = require("../controllers/userController.js");

// Tạo API phương thức GET
userRoute.get("/getUser", getUser);

// Tạo API phương thức GET by Id
userRoute.get("/getUser/:id", getUserById);

// Tạo API phương thức POST
userRoute.post("/createUser", createUser);

// Tạo API phương thức PUT
userRoute.put("/updateUser/:id", updateUser);

// Tạo API phương thức POST
userRoute.post("/orderFood", orderFoodfromUser);

// Tạo API phương thức GET
userRoute.get("/like/:id", getLikeById);

// Tạo API phương thức GET
userRoute.get("/rate/:id", getRateById);

// yarn add sequelize-auto

module.exports = userRoute;
