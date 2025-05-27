const productController = require("../controllers/product.controller");
const { requireAdmin } = require("../utils/authorization");

module.exports = [
  {
    method: "GET",
    path: "/products",
    options: productController.getAllProduct,
  },
  {
    method: "GET",
    path: "/products/{id}",
    options: productController.getProductById,
  },
  {
    method: "POST",
    path: "/products",
    options: {
      ...productController.createProduct,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "PUT",
    path: "/products/{id}",
    options: {
      ...productController.updateProduct,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    options: {
      ...productController.deleteProduct,
      pre: [{ method: requireAdmin }],
    },
  },
];
