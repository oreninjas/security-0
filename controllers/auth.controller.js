import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {
  registerFunc: async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser = await userModel.create({
        username: username,
        password: hashedPassword,
      });

      let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
      res.cookie("token", token);

      res.redirect("/dashboard");
    } catch (error) {
      console.log("Error occured while registering !!", error);
      res.redirect("/register");
    }
  },
  loginFunc: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await userModel.findOne({ username });
      let comparedPassword = await bcrypt.compare(password, user.password);
      if (!comparedPassword) return res.redirect("/login");

      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);

      if (user.role === "admin") {
        res.redirect("/admin-panel");
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      console.log("error occured while logging in !!", error);
    }
  },
};

export default authController;
