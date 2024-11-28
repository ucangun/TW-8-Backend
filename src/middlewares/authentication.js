"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API

# npm i jsonwebtoken
------------------------------------------------------- */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  req.user = null;

  // 1) Get the token from the request headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next();
  }

  //! Check if the token is blacklisted

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_KEY);

  // Check if the user still exis
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token no longer exists.",
    });
  }

  // access to the protected route
  req.user = currentUser;
  next();
};
