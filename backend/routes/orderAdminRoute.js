//Router Setup
const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

// Controller Imports
const {
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderAdminController");

// Joining Controller With Router
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")  
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);   

router
  .route("/admin/order/:id")  
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);  

// Exports
module.exports = router;  