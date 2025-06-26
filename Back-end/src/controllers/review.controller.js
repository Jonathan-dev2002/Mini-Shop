const {
  createReviewSchema,
  updateReviewSchema,
  idParamSchema,
} = require("../validations/review.validation");
const reviewService = require("../services/review.service");
const validateZod = require("../validations/validateZod");
const Boom = require('@hapi/boom');

const createReview = {
  description: "Create a new review for a product",
  tags: ["api", "review"],
  validate: {
    payload: validateZod(createReviewSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.sub;
      const reviewData = request.payload;
      const newReview = await reviewService.createReview(userId, reviewData);
      return h.response(newReview).code(201);
    } catch (error) {
      if (error.isBoom) {
        return error;
      }
      console.error("Error creating review:", error);
      return Boom.internal("Failed to create review");
    }
  },
};

const getAllReview = {
  description: "Get list of all review",
  tags: ["api", "review"],
  auth: false,
  handler: async (request, h) => {
    try {
      const { productId } = request.query;
      const review = await reviewService.getAllReview(productId);
      return h.response(review).code(200);
    } catch (error) {
      console.error("Error fetching review:", error);
      return h.response({ message: "Failed to fetch review" }).code(500);
    }
  },
};

const getReviewById = {
  description: "Get user by Id",
  tags: ["api", "user"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const review = await reviewService.getReviewById(id);

      if (!review) return h.response({ message: "review not found" }).code(404);
      return h.response(review).code(200);
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      return h.response({ message: "Failed to fetch review" }).code(500);
    }
  },
};

const updateReview = {
  description: "Update your own review",
  tags: ["api", "review"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateReviewSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.sub;
      const { id: reviewId } = request.params;
      const updateData = request.payload;
      const updatedReview = await reviewService.updateReview(
        reviewId,
        userId,
        updateData
      );
      return h.response(updatedReview).code(200);
    } catch (error) {
      if (error.isBoom) {
        return error;
      }
      console.error("Error updating review:", error);
      return Boom.internal("Failed to update review");
    }
  },
};

const deleteReview = {
  description: "Delete a review (owner or admin)",
  tags: ["api", "review"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const user = request.auth.credentials; // contains user.id and user.role
      const { id: reviewId } = request.params;
      await reviewService.deleteReview(reviewId, user);
      return h.response({ message: "Review deleted successfully" }).code(200);
    } catch (error) {
      if (error.isBoom) {
        return error;
      }
      console.error("Error deleting review:", error);
      return Boom.internal("Failed to delete review");
    }
  },
};

module.exports = {
  createReview,
  getAllReview,
  getReviewById,
  updateReview,
  deleteReview
};
