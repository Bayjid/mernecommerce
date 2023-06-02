const ErrorHandler = require("../error/errorHandler");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");

// Get all users(admin)
exports.getAllUser = async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });

};


// Get single user (admin)
exports.getSingleUser = async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });

};


// update User Role -- Admin
exports.updateUserRole = async (req, res, next) => {
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};
