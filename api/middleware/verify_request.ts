import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import express from "express";

const config = process.env;

const verifyToken = async (req: express.Request, res: express.Response, next) => {
  const token = req.body.token;

  if (!token) {
    return res
      .status(403)
      .json({ status: "false", error_message: "Необходимо авторизоваться", reload: true });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log({ action: "checkPost", decoded_jwt: decoded });

    const userData = await User.findOne({
      _id: decoded.user_id,
    }).exec();

    console.log(userData);

    if (decoded.user_id == userData._id) {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: "false", error_message: "Необходимо авторизоваться", reload: true });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ status: "false", error_message: "Необходимо авторизоваться", reload: true });
  }
};

module.exports = verifyToken;
