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
    favorites: req.body.favorites,
    isAdmin: req.body.isAdmin,
  });

  console.log(newUser);

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

router.patch("/:email/updateFavorites", async (req, res) => {
  const { email } = req.params;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(404).send({
      statusCode: 404,
      message: "No user found",
    });
  }

  try {
    const updatedFavorites = Array.isArray(req.body.favorites)
      ? req.body.favorites
      : [req.body.favorites];

    user.favorites = updatedFavorites;

    const result = await user.save();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
