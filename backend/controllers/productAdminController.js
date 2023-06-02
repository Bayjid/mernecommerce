const Product = require("../models/productModel");
const ErrorHandler = require("../error/errorHandler");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");



// Create Product -- Admin
exports.createProduct = async (req, res, next) => {  

//  Image code start
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
//  Image code end


  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};


// Get All Product (Admin)
exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};


// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};


// Delete Product  --Admin
exports.deleteProduct = async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};


// test
exports.test = async (req, res, next) => {


  console.log("hit test");
  
  



  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "test",
  });

  console.log(result);


  res.status(200).json({
    success: true,
    message: "test run Successfully",
  });

  



};


