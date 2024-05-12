const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUserBody = require("../middlewares/validateUserBody");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

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
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      favorites: req.body.favorites,
      isAdmin: req.body.isAdmin,
    });

    async function sendMail() {
      const info = await transporter.sendMail({
        from: "noreply@snkrz.com>", // sender address
        to: String(req.body.email), // list of receivers
        subject: "SNKRZ Sign-Up", // Subject line
        text: "Thank you! You've been succesfully registered to SNKRZ", // plain text body,
        html: "<p>Thank you! You've been succesfully registered to SNKRZ</p>",
      });

      console.log(info);
    }

    try {
      const userToSave = await newUser.save();
      sendMail().catch(console.error);
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
  } else {
    res.status(500).send({
      statusCode: 500,
      message: "User already exists",
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
