// yarn start
// yarn add express
// yarn add nodemon
// yarn add sequelize

// commonjs module =>import
const express = require("express");
// gán hàm này lại cho một biến mới
const app = express();

// cho phép sever back end đọc được chuỗi json
app.use(express.json());

// yarn add cors
// cấp phép cho font end truy cập
const cors = require("cors");
app.use(cors());

// Khởi tạo sever bằng Express
// port: địa chỉ định danh sever
app.listen(8080);

var rootRoute = require("./routes/rootRoute.js");
app.use("/api", rootRoute);
