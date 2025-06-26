const Boom = require("@hapi/boom");
const favoriteService = require("../services/favorite.service");
const validateZod = require("../validations/validateZod");
const {
  favoriteActionSchema,
  productIdParamSchema,
} = require("../validations/favorite.validation");

const addFavorite = {
  description: "Add a product to the user's favorites",
  tags: ["api", "favorite"],
  validate: {
    payload: validateZod(favoriteActionSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.sub;
      const { productId } = request.payload;
      const favorite = await favoriteService.addFavorite(userId, productId);
      return h.response(favorite).code(201);
    } catch (error) {
      console.error("Error adding favorite:", error);
      return Boom.internal("Failed to add favorite");
    }
  },
};

const removeFavorite = {
  description: "Remove a product from the user's favorites",
  tags: ["api", "favorite"],
  validate: {
    params: validateZod(productIdParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.sub;
      const { productId } = request.params;
      await favoriteService.removeFavorite(userId, productId);
      return h.response({ message: "Favorite removed successfully" }).code(200);
    } catch (error) {
      console.error("Error removing favorite:", error);
      return Boom.internal("Failed to remove favorite");
    }
  },
};

const getMyFavorites = {
  description: "Get all favorite products for the current user",
  tags: ["api", "favorite"],
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.sub;
      const favorites = await favoriteService.getMyFavorites(userId);
      return h.response(favorites).code(200);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return Boom.internal("Failed to fetch favorites");
    }
  },
};

module.exports = {
  addFavorite,
  removeFavorite,
  getMyFavorites,
};
