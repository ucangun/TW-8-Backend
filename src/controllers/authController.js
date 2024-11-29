"use strict";
/* -------------------------------------------------------
               NODEJS EXPRESS | Hotel API
------------------------------------------------------- */

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const Blacklist = require("../models/blacklistModel");
const sendEmail = require("../helpers/sendEmail");
const { promisify } = require("util");

exports.signup = async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/auth/verifyEmail?token=${token}`;

  const message = `Welcome to our application! Please verify your email by clicking the following link: \n\n ${verificationUrl}`;

  await sendEmail({
    email: newUser.email,
    subject: "Verify your email",
    message,
  });

  res.status(201).json({
    status: "success",
    message: "A verification email has been sent to your email address.",
  });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid or missing token",
    });
  }

  // Jwt Verify

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User does not exist",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      status: "fail",
      message: "User already verified",
    });
  }

  user.isVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Email successfully verified!",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password!",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  if (!user.isVerified) {
    return res.status(401).json({
      status: "fail",
      message: "Please verify your email before logging in",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
