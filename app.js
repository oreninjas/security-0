import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import dbConnection from "./db/db.connect.js";

// middlewares
import isAdminMiddleware from "./middlewares/isAdmin.middleware.js";
import isUserMiddleware from "./middlewares/isUser.middleware.js";

// controllers
import authContoller from "./controllers/auth.controller.js";

dbConnection();

// impotring middlewares
import cookieParser from "cookie-parser";

app.set("view engine", "ejs");
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
