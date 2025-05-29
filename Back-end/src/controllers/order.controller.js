const validateZod = require("../validations/validateZod");
const {
  idParamSchema,
  createOrderSchema,
  updateStatusSchema
} = require("../validations/order.validation");
const orderService = require("../services/order.service");
const Boom = require('@hapi/boom');

const createOrder = {
  description: "checkout and create new order",
  tags: ["api", "order"],
  validate: { payload: validateZod(createOrderSchema) },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const { paymentMethod, shippingAddress, phone } = request.payload;
      const order = await orderService.createOrder(
        userId,
        paymentMethod,
        shippingAddress,
        phone
      );
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

const updateOrderStatus = {
  description: 'Update an order’s status',
  tags: ['api','order'],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateStatusSchema)
  },
  handler: async (request, h) => {
    const { id } = request.params;
    const { status } = request.payload;
    try {
      // if (request.auth.credentials.role !== 'ADMIN') {
      //   throw Boom.forbidden('Admins only');
      // }
      const updated = await orderService.updateOrderStatus(request.auth.credentials.sub, id, status);
      return h.response(updated).code(200);
    } catch (err) {
      console.error('Error updating order status:', err);
      return h.response({ message: err.message }).code(err.isBoom ? err.output.statusCode : 500);
    }
  }
};
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
