const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUserBody = require("../middlewares/validateUserBody");

router.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createUser", validateUserBody, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const userToSave = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      payload: userToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router
