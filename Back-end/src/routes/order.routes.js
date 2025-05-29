const orderController = require("../controllers/order.controller");

module.exports = [
  {
    method: "GET",
    path: "/orders",
    options: orderController.getOrders,
  },
  {
    method: "GET",
    path: "/orders/{id}",
    options: orderController.getOrderById,
  },
  {
    method: "POST",
    path: "/orders",
    options: orderController.createOrder,
  },
  {
    method: "PUT",
    path: "/orders/{id}/status",
    options: orderController.updateOrderStatus,
  },
];
