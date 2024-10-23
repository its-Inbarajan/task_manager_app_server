const express = require("express");
const {
  createUsers,
  userSignIn,
  userLogout,
} = require("../../controllers/userControllers/userControllers");

const usersRoute = express.Router();

usersRoute.post("/signup", createUsers);
usersRoute.post("/login", userSignIn);
usersRoute.post("/logout", userLogout);

module.exports = usersRoute;
