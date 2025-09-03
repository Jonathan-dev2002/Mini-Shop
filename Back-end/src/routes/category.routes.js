const categoryController = require("../controllers/category.controller");
const { requireAdmin } = require("../utils/authorization");

module.exports = [
  {
    method: "GET",
    path: "/categories",
    options: categoryController.getAllCategory,
  },
  {
    method: "GET",
    path: "/categories/{id}",
    options: categoryController.getCategoryById,
  },
  {
    method: "POST",
    path: "/categories",
    options: {
      ...categoryController.createCategory.options,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "PUT",
    path: "/categories/{id}",
    options: {
      ...categoryController.updateCategory,
      pre: [{ method: requireAdmin }],
    },
  },
  {
    method: "DELETE",
    path: "/categories/{id}",
    options: {
      ...categoryController.deleteCategory,
      pre: [{ method: requireAdmin }],
    },
  },
];
