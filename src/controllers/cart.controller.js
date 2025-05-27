const validateZod = require("../validations/validateZod");
const {
  addToCartSchema,
  idParamSchema,
} = require("../validations/cart.validation");
const cartService = require("../services/cart.service");

const getCart = {
  description: "get cart items of user",
  tags: ["api", "cart"],
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const items = await cartService.getCartItems(userId);

      return h.response(items).code(200);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return h.response({ message: "Failed to fetch cart items" }).code(500);
    }
  },
};

const addToCart = {
  description: "Add product to cart",
  tags: ["api", "cart"],
  validate: { payload: validateZod(addToCartSchema) },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const { productId, quantity } = request.payload;
      const item = await cartService.addItemToCart(
        userId,
        Number(productId),
        quantity
      );

      return h.response(item).code(201);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return h.response({ message: "Failed to add item to cart" }).code(500);
    }
  },
};

const updateCart = {
  description: "Update cart item quantity",
  tags: ["api", "cart"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(addToCartSchema.pick({ quantity: true })),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const { quantity } = request.payload;
      const item = await cartService.updateCartItem(id, quantity);

      return h.response(item).code(200);
    } catch (error) {
      console.error("Error updating cart item:", error);
      return h.response({ message: "Failed to update cart item" }).code(500);
    }
  },
};

const removeFromCart = {
  description: "Remove item from cart",
  tags: ["api", "cart"],
  validate: { params: validateZod(idParamSchema) },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      await cartService.removeCartItem(id);
      return h.response({ message: "Removed" }).code(200);
    } catch (error) {
      console.error("Error removing cart item:", error);
      return h.response({ message: "Failed to remove cart item" }).code(500);
    }
  },
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
