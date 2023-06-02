//Router Setup
const express = require("express");
const router = express.Router();


// Controller Imports
const {
  getAllProducts,
  getProductDetails
} = require("../controllers/productController");


// Joining Controller With Router
router
    .route("/products")
    .get(getAllProducts);

router
    .route("/product/:id")
    .get(getProductDetails);    


// Exports
module.exports = router;