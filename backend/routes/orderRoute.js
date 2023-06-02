//Router Setup
const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

// Controller Imports
const {
  newOrder,
  getSingleOrder,
  myOrders,  
} = require("../controllers/orderController");

// Joining Controller With Router
router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);


// Exports
module.exports = router;