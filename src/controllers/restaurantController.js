const { successCode, errorCode, failCode } = require("../config/response");
const sequelize = require("../models/index.js");
const initModels = require("../models/init-models.js");
const model = initModels(sequelize);

const getLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.restaurant.findAll({
      include: ["user_id_users"],
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
    const data = await model.restaurant.findAll({
      include: ["user_id_user_rate_res"],
    });

    if (data) return successCode(res, "Get data successful", data);
    else return failCode(res, "Data not found!");
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, date_like } = req.body;

    const likeCol = {
      user_id,
      res_id: id,
    };

    const userExists = await model.user.findOne({ where: { user_id } });
    const resExists = await model.restaurant.findOne({
      where: { res_id: id },
    });

    if (userExists && resExists) {
      const likeModel = {
        ...likeCol,
        ...(date_like && { date_like }),
      };

      const likeExists = await model.like_res.findOne({ where: likeCol });

      if (likeExists) {
        await model.like_res.destroy({ where: likeCol });
        return successCode(res, "Unlike successfully");
      } else {
        const data = await model.like_res.create(likeModel);
        return successCode(res, "Like successfully", data);
      }
    } else {
      return failCode(res, "user or retaurant not found!");
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const rate = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, amount, date_rate } = req.body;

    const rateCol = {
      user_id,
      res_id: id,
    };

    const userExists = await model.user.findOne({ where: { user_id } });
    const resExists = await model.restaurant.findOne({
      where: { res_id: id },
    });

    if (userExists && resExists) {
      const rateModel = {
        ...rateCol,
        ...(amount && { amount }),
        ...(date_rate && { date_rate }),
      };

      const rateExists = await model.rate_res.findOne({ where: rateCol });

      if (rateExists) {
        await model.rate_res.update(
          {
            ...rateModel,
          },
          { where: rateCol }
        );
        return successCode(res, "Update rate successfully", rateModel);
      } else {
        const data = await model.rate_res.create(rateModel);
        return successCode(res, "Rate successfully", data);
      }
    } else {
      return failCode(res, "user or retaurant not found!");
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

module.exports = {
  getLikeById,
  getRateById,
  toggleLike,
  rate,
};
