const prisma = require("../utils/prisma");
const Boom = require("@hapi/boom");

const getAllReview = async (productId) => {
  const whereClause = {};

  if (productId) {
    const numericProductId = Number(productId);
    if (!isNaN(numericProductId)) {
      whereClause.productId = numericProductId;
    } else {
      console.warn(
        `Invalid productId format: ${productId}. Fetching all reviews.`
      );
    }
  }

  return await prisma.review.findMany({
    where: whereClause,
    include: {
      product: {
        select: { name: true },
      },
      user: {
        select: { firstName: true, lastName: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getReviewById = async (id) => {
  return await prisma.review.findUnique({ where: { id: Number(id) } });
};

const createReview = async (userId, data) => {
  const { productId, rating, comment } = data;

  const existingReview = await prisma.review.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existingReview) {
    throw Boom.conflict("You have already reviewed this product.");
  }

  
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: { userId },
    },
  });
  if (!hasPurchased) {
    throw Boom.forbidden("You can only review products you have purchased.");
  }

  return prisma.$transaction(async (tx) => {
    const newReview = await tx.review.create({
      data: {
        rating,
        comment,
        userId,
        productId,
      },
    });

    await updateProductRating(productId, tx);

    return newReview;
  });
};

// --- Helper function for updating product ratings ---
const updateProductRating = async (productId, tx) => {
  const prismaClient = tx || prisma;

  const stats = await prismaClient.review.aggregate({
    where: { productId: Number(productId) },
    _avg: {
      rating: true,
    },
    _count: {
      id: true,
    },
  });

  const avgRating = stats._avg.rating || 0;
  const reviewCount = stats._count.id || 0;

  await prismaClient.product.update({
    where: { id: Number(productId) },
    data: {
      averageRating: avgRating,
      reviewCount: reviewCount,
    },
  });
};

const updateReview = async (reviewId, userId, data) => {
  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
  });

  if (!review) {
    throw Boom.notFound("Review not found.");
  }
  if (review.userId !== userId) {
    throw Boom.forbidden("You can only update your own review.");
  }

  return prisma.$transaction(async (tx) => {
    const updatedReview = await tx.review.update({
      where: { id: Number(reviewId) },
      data: {
        rating: data.rating,
        comment: data.comment,
      },
    });

    // Only update product rating if the rating was actually changed
    if (data.rating !== undefined) {
      await updateProductRating(review.productId, tx);
    }

    return updatedReview;
  });
};

const deleteReview = async (reviewId, user) => {
  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
  });

  if (!review) {
    throw Boom.notFound("Review not found.");
  }

  // Allow deletion if user is the owner OR if the user is an admin
  if (review.userId !== user.id && user.role !== "ADMIN") {
    throw Boom.forbidden("You can only delete your own review.");
  }

  return prisma.$transaction(async (tx) => {
    await tx.review.delete({
      where: { id: Number(reviewId) },
    });

    await updateProductRating(review.productId, tx);
  });
};

module.exports = {
  getAllReview,
  getReviewById,
  createReview,
  updateProductRating,
  updateReview,
  deleteReview,
};
