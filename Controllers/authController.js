const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");
const User = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../Utils/sendEmail");

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
    role: req.body.role,
  });

  //Generate token
  const token = createToken(user._id);
  // Send response
  res.status(201).json({ data: user, token });
});

exports.Login = asyncHandler(async (req, res, next) => {
  //check if password and email exist
  //check if user exists and check if password is correct
  console.log(req.body)
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  //generate token
  const token = createToken(user._id);
  //send response
  res.status(200).json({ data: user, token });
});

exports.ForGotPassword = asyncHandler(async (req, res, next) => {
  //check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("There is no user with this email", 404));
  }
  //generate token
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = await bcrypt.hash(resetCode, 12);
  user.passwordResetCode = hashedResetCode;

  // Expires in 10 minutes
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();
  try {
    //send Email
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 minutes)",
      message: `Use this code to reset your password: ${resetCode}`,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(
      new ApiError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }

  //send response
  res
    .status(200)
    .json({ status: "success", message: "Reset code sent to email" });
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = await bcrypt.hash(req.body.resetCode, 12);
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid or expired reset code", 400));
  }
  // Reset password verified
  user.ResetPasswordVerified = true;
  await user.save();

  //send response
  res.status(200).json({ status: "success", message: "Reset code verified" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (!user.passwordResetVerified) {
    return next(new ApiError("Please verify your reset code", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  //generate token
  const token = createToken(user._id);

  res.status(200).json({ status: "success", token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  //check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }
  //check if token is valid
  const decoded = jwt.verify(token, process.env.Jwt_SECRET_KEY);
  //check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User no longer exists", 401));
  }
  // check if user is active
  // if (!user.active) {
  //   return next(new ApiError("User is no longer active", 401));
  // }
  //check if user changed password after token was created
  if (user.passwordChangeAt) {
    const passChangedTimestamp = parseInt(
      user.passwordChangeAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }
  req.user = user;
  next();
});
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
