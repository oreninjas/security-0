import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isUser = async (req, res, next) => {
  const userToken = req.cookies.token;
  if (!userToken) return res.redirect("/login");

  try {
    let isUser = jwt.verify(userToken, process.env.JWT_SECRET);

    let dbUser = await userModel
      .findOne({ _id: isUser._id })
      .select("-password");
    if (!dbUser) return res.redirect("/login");

    req.user = dbUser;

    next();
  } catch (error) {
    res.redirect("/login");
  }
};

export default isUser;
