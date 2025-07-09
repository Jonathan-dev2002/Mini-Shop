const prisma = require("../utils/prisma");
const Boom = require("@hapi/boom");

const addFavorite = async (userId, productId) => {
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existingFavorite) {
    return existingFavorite;
  }

  return prisma.favorite.create({
    data: {
      userId,
      productId,
    },
  });
};

const removeFavorite = async (userId, productId) => {
  return prisma.favorite
    .delete({
      where: {
        userId_productId: {
          userId,
          productId: Number(productId),
        },
      },
    })
    .catch((error) => {
      if (error.code === "P2025") {
        return { message: "Favorite not found or already removed." };
      }
      throw error;
    });
};

const getMyFavorites = async (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  addFavorite,
  removeFavorite,
  getMyFavorites,
};
