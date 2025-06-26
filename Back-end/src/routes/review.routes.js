const reviewController = require("../controllers/review.controller");
module.exports = [
  {
    method: "GET",
    path: "/review",
    options: reviewController.getAllReview,
  },
  {
    method: "GET",
    path: "/review/{id}",
    options: reviewController.getReviewById,
  },
  {
    method: "POST",
    path: "/review",
    options: reviewController.createReview,
  },
  {
    method: "PUT",
    path: "/review/{id}",
    options: reviewController.updateReview,
  },
  {
    method: "DELETE",
    path: "/review/{id}",
    options: reviewController.deleteReview,
  },
];
