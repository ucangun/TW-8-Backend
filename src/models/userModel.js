/*****************************************************
                    EXPRESS.JS 
#  npm i validator                     
#  npm i bcrypt
/****************************************************/

const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");

/****************************************************/

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

//! password hash with bcrypt

//! add correct passsword method

module.exports = mongoose.model("User", userSchema);
