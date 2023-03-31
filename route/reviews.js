const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utility/ExpressError");
const catchAsync = require("../utility/catchAsync");
const Campground = require("../models/camp");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//REVIEWS

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
