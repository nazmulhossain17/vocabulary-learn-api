const express = require("express");
const { registerUser } = require("../controller/user.controller");
const route = express.Router();

route.post("/register", registerUser);

module.exports = route;
