// kết nối CSDL
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_food", "root", "1234", {
  host: "localhost",
  port: "3306",
  dialect: "mysql", //hệ CSDL đang sử dụng
});

// try {
//   sequelize.authenticate();
//   console.log("kết nối thành công");
// } catch {
//   console.log("kết nối thất bại");
// }

module.exports = sequelize;
