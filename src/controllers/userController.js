// const User = require("../models/user.js");
const { successCode, errorCode, failCode } = require("../config/response");
const sequelize = require("../models/index.js");
const initModels = require("../models/init-models.js");
const model = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    // SELECT * FROM user
    let data = await model.user.findAll();
    return successCode(res, "Get user successful", data);
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    // SELECT * FROM user WHERE user_id = id
    let dataOne = await model.user.findOne({
      where: {
        user_id: id,
      },
    });

    if (dataOne) {
      return successCode(res, "Get user successful", dataOne);
    } else {
      failCode(res, "User not found!");
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const createUser = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;
    // thêm data vào CSDL
    let newUser = {
      full_name,
      email,
      pass_word,
    };

    let data = await model.user.create(newUser);
    if (data) {
      return successCode(res, "Create user successful", dataOne);
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // SELECT * FROM user WHERE user_id = id
    let dataOne = await model.user.findOne({
      where: {
        user_id: id,
      },
    });

    if (dataOne) {
      // Update user
      const { full_name, email, pass_word } = req.body;
      // thêm data vào CSDL
      const getUser = {
        full_name,
        email,
        pass_word,
      };

      let data = await model.user.update(getUser, {
        where: {
          user_id: id,
        },
      });
      if (data[0] === 1) return successCode(res, "Data update successful");
      else return successCode(res, "Nothing was changing in the database");
    } else {
      return failCode(res, "User not found!");
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const getLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.user.findAll({
      include: ["res_id_restaurants"],
    });

    if (data) return successCode(res, "Get data successful", data);
    else return failCode(res, "Data not found!");
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const getRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.user.findAll({
      include: ["res_id_restaurant_rate_res"],
    });

    if (data) return successCode(res, "Get data successful", data);
    else return failCode(res, "Data not found!");
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const orderFoodfromUser = async (req, res) => {
  // Lấy data từ font end
  const { user_id, food_id, amount = 1, code, arrSubId } = req.body;

  // Gộp 2 primaryKey lại dễ sử dụng và dễ quản lý
  const orderCol = {
    food_id,
    user_id,
  };

  // Kiểm tra user có tồn tại không?
  try {
    const userExists = await model.user.findOne({
      where: {
        user_id,
      },
    });

    // Kiểm tra food có tồn tại không?
    const foodExists = await model.food.findOne({
      where: {
        food_id,
      },
    });

    // Nếu user và food tồn tại thì thêm data vào CSDL
    if (userExists && foodExists) {
      const orderModel = {
        ...orderCol,
        ...(amount && { amount }),
        ...(code && { code }),
        ...(arrSubId && { arr_sub_id: arrSubId }),
      };

      // Kiểm tra order có tồn tại không?
      const orderExists = await model.order.findOne({ where: orderCol });

      // Nếu order tồn tại thì update chưa thì create
      if (orderExists) {
        await model.order.update(
          {
            ...orderModel,
            ...(amount && { amount: orderExists.amount + amount }),
          },
          { where: orderCol }
        );
      } else {
        await model.order.create(orderModel);
      }
      return successCode(res, "Order food successfully");
    } else {
      return failCode(res, "User or food not found!");
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  orderFoodfromUser,
  getLikeById,
  getRateById,
};
