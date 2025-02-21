const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");
const User = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.Jwt_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.Signup = asyncHandler(async (req, res, next) => {
  //Create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //Generate token
  const token = createToken(user._id);
  // Send response
  res.status(201).json({ data: user, token });
});

exports.Login = asyncHandler(async (req, res, next) => {
    //check if password and email exist
    //check if user exists and check if password is correct
    const user = await User.findOne({ email: req.body.email });
    if(!user || !(await bcrypt.compare(req.body.password, user.password))){
        return next(new ApiError('Incorrect email or password', 401));
    }
    //generate token
    const token = createToken(user._id);
    //send response
    res.status(200).json({ data: user, token });
});

