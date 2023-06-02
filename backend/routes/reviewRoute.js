//Router Setup
const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

// Controller Imports
const {
  createReview,
  ReviewsOfSingleProduct,
  getSingleReview,
  updateReview,
  deleteReview 
} = require("../controllers/reviewController");

// Joining Controller With Router
router
.route("/review/:id")
.post(isAuthenticatedUser, createReview);

router
.route("/reviews/product/:id")
.get(ReviewsOfSingleProduct);

router
.route("/review/:id")
.get(isAuthenticatedUser, getSingleReview);

router
.route("/review/:id")
.put(isAuthenticatedUser, updateReview);

router
.route("/review/:id")
.delete(isAuthenticatedUser, deleteReview);



// Exports
module.exports = router;