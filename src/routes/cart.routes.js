const cartController = require("../controllers/cart.controller");

module.exports = [
  {
    method: "GET",
    path: "/cart",
    options: cartController.getCart,
  },
  {
    method: "POST",
    path: "/cart/items",
    options: cartController.addToCart,
  },
  {
    method: "PUT",
    path: "/cart/items/{id}",
    options: cartController.updateCart,
  },
  {
    method: "DELETE",
    path: "/cart/items/{id}",
    options: cartController.removeFromCart,
  },
];
