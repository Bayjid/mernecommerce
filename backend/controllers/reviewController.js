const Review = require("../models/ReviewModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../error/errorHandler");
const { chechPermissions } = require("../utils/checkPermissions");

// create review
exports.createReview = async (req, res, next) => {

  //const { product: productId } = req.body;

  const { id: productId } = req.params;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    return next(new ErrorHandler(`No product with id : ${productId}`, 404));
  }
  

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.id    
  });

  if (alreadySubmitted) {
    return next(new ErrorHandler('Already submitted review for this product', 400));
  }

  req.body.user = req.user.id;
  req.body.name = req.user.name;
  req.body.product = productId;
  const review = await Review.create(req.body);
  res.status(200).json({success: true, review });
};


// Reviews of Single Product
exports.ReviewsOfSingleProduct = async (req, res, next) => {

  const { id: productId } = req.params;

  const reviews = await Review.find({ product: productId});

  if (!reviews) {
    return next(new ErrorHandler(`This product has no review`, 404));
  }

  res.status(200).json({success: true, reviews });
};


// Read Single Review
exports.getSingleReview = async (req, res, next) => {

  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    return next(new ErrorHandler(`No review with id ${reviewId}`, 404));
  }

  res.status(200).json({success: true, review });
};


//Update Review
exports.updateReview = async (req, res, next) => {

  const { id: reviewId } = req.params;  

  let review = await Review.findOne({ _id: reviewId });

  if (!review) {
    return next(new ErrorHandler(`No review with id ${reviewId}`, 400));
  }

  chechPermissions(req.user, review.user);

  review = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }); 

  res.status(200).json({success: true, review });
};


exports.deleteReview = async (req, res, next) => {

  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    return next(new ErrorHandler(`No review with id ${reviewId}`, 400));
  }

  chechPermissions(req.user, review.user);

  await review.remove();

  res.status(200).json({ success: true, msg: 'Success! Review removed' });
};