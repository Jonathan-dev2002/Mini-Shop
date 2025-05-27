const userController = require("../controllers/user.controllers");
const { requireAdmin } = require("../utils/authorization");
module.exports = [
  {
    method: "GET",
    path: "/users",
    options: {
      ...userController.getAllUsers,
      pre: [
        { method: requireAdmin },
      ],
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    options: userController.getUserById,
  },
  {
    method: "POST",
    path: "/users",
    options: userController.createUser,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    options: userController.updateUser,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    options: userController.deleteUser,
  },
];
