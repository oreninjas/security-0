import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    let isVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (!isVerified) return res.redirect("/dashboard");

    let admin = await userModel
      .findOne({ _id: isVerified._id, role: "admin" })
      .select("-password");
    if (!admin) return res.redirect("/dashboard");

    req.admin = admin;
    next();
  } catch (error) {
    res.redirect("/dashboard");
  }
};

export default isAdmin;
