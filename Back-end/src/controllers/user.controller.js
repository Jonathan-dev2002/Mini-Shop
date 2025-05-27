const {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
} = require("../validations/user.validation");
const userService = require("../services/user.service");
const validateZod = require("../validations/validateZod");


const getAllUsers = {
  description: "Get list of all users",
  tags: ["api" , "user"],
  handler: async (request, h) => {
    try {
      const user = await userService.getAllUsers();
      return h.response(user).code(200);
    } catch (error) {
      console.error("Error fetching users:", error);
      return h.response({ message: "Failed to fetch users" }).code(500);
    }
  },
};

const getUserById = {
  description: "Get user by Id",
  tags: ["api" , "user"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const user = await userService.getUserById(id);

      if (!user) return h.response({ message: "User not found" }).code(404);
      return h.response(user).code(200);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return h.response({ message: "Failed to fetch user" }).code(500);
    }
  },
};

const createUser = {
  description: "create new user",
  tags: ["api", "user"],
  auth: false,
  validate: {
    payload: validateZod(createUserSchema),
  },
  handler: async (request, h) => {
    try {
      const newUser = await userService.createUser(request.payload);
      return h.response(newUser).code(201);
    } catch (error) {
      console.error("Error creating user:", error);
      return h.response({ message: "Failed to create user" }).code(500);
    }
  },
};

const updateUser = {
  description: "update user",
  tags: ["api", "user"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateUserSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const updateUser = await userService.updateUser(id, request.payload);
      return h.response(updateUser).code(201);
    } catch (error) {
      console.error("Error updating user:", error);
      return h.response({ message: "Failed to update user" }).code(500);
    }
  },
};

const deleteUser = {
  description: "delete user",
  tags: ["api", "user"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const deleteUser = await userService.deleteUser(id);
      return h.response(deleteUser).code(200);
    } catch (error) {
      console.error("Error deleting user:", error);
      return h.response({ message: "Failed to delete user" }).code(500);
    }
  },
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
