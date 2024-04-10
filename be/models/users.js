const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false,
  },
}, { timestamps: true, strict: true});

module.exports = mongoose.model('userModel', UserSchema, 'users')
