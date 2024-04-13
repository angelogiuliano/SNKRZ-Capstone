const express = require('express')
const login = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/users')

login.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "No user found"
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordValid) {
            return res.status(404).send({
                statusCode: 404,
                message: "Wrong email or password"
            }) 
        }

        const token = jwt.sign(      {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            favorites: user.favorites
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          })

          res.setHeader('authorization', token)
          res.status(200).send({
            message: "login succesful",
            statusCode: 200,
            token
          })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
          });
    }
})


module.exports = login