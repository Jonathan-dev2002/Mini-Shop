const validateZod = require("../validations/validateZod");
const { idParamSchema } = require("../validations/order.validation");
const orderService = require("../services/order.service");

const createOrder = {
  description: "checkout and create new order",
  tags: ["api", "order"],
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const order = await orderService.createOrder(userId);
      return h.response(order).code(201);
    } catch (err) {
      console.error("Error creating order:", err);
      return h.response({ message: err.message }).code(400);
    }
  },
};

const getOrders = {
  description: "Get order history for current user",
  tags: ["api", "order"],
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const orders = await orderService.getOrdersByUser(userId);
      return h.response(orders).code(200);
    } catch (err) {
      console.error("Error fetching orders:", err);
      return h.response({ message: "Failed to fetch orders" }).code(500);
    }
  },
};

const getOrderById = {
  description: "Get order details by ID",
  tags: ["api", "order"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const { id } = request.params;
      const order = await orderService.getOrderById(userId, id);
      if (!order) {
        return h.response({ message: "Order not found" }).code(404);
      }
      return h.response(order).code(200);
    } catch (err) {
      console.error("Error fetching order by ID:", err);
      return h.response({ message: "Failed to fetch order" }).code(500);
    }
  },
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
