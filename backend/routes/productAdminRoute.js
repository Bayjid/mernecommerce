//Router Setup
const express = require("express");
const router = express.Router();





const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

// Controller Imports
const {
  getAllProducts,
  createProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  test  
} = require("../controllers/productAdminController");


// Joining Controller With Router

router
   .route("/admin/product/new")
   .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
   .route("/admin/products")
   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
   .route("/admin/product/:id")
   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
   .route("/admin/product/:id")
   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
   
router
   .route("/test")
   .post( isAuthenticatedUser,  test);     
      
// Exports
module.exports = router;