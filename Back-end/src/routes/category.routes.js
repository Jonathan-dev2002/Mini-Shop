const categoryController = require("../controllers/category.controller");
const { requireAdmin } = require("../utils/authorization");

module.exports = [
  {
    method: "GET",
    path: "/categorys",
    options: categoryController.getAllCategory,
  },
  {
    method: "GET",
    path: "/categorys/{id}",
    options: categoryController.getCategoryById,
  },
  {
    method: "POST",
    path: "/categorys",
    options: {
      ...categoryController.createCategory,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "PUT",
    path: "/categorys/{id}",
    options: {
      ...categoryController.updateCategory,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "DELETE",
    path: "/categorys/{id}",
    options: {
      ...categoryController.deleteCategory,
      pre: [{ method: requireAdmin }],
    },
  },
];
