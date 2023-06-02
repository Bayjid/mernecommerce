const ErrorHandler = require("../error/errorHandler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");


// Create new Order
exports.newOrder = async (req, res, next) => {

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    vatPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    vatPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });

};

// get Single Order
exports.getSingleOrder = async (req, res, next) => {

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });

};


// get logged in user  Orders
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};