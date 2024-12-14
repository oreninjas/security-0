import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
const app = express();

import dbConnection from "./src/db/db.connect.js";

// middlewares
import isAdminMiddleware from "./src/middlewares/isAdmin.middleware.js";
import isUserMiddleware from "./src/middlewares/isUser.middleware.js";

// controllers
import authContoller from "./src/controllers/auth.controller.js";

dbConnection();

// impotring middlewares
import cookieParser from "cookie-parser";

app.set("view engine", "ejs");
app.set("views", path.join('./src/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Register Handlers
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", authContoller.registerFunc);

// Login Handlers
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", authContoller.loginFunc);

// Pages
app.get("/dashboard", isUserMiddleware, (req, res) => {
  res.render("dashboard");
});

app.get("/admin-panel", isAdminMiddleware, (req, res) => {
  res.render("adminPanel");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
