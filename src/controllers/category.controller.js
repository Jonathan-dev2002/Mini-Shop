const {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} = require("../validations/category.validation");
const categoryService = require("../services/category.service");
const validateZod = require("../validations/validateZod");

const getAllCategory = {
  description: "Get list all category",
  tags: ["api","category"],
  handler: async (request, h) => {
    try {
      const AllCategory = await categoryService.getAllCategory();
      return h.response(AllCategory).code(200);
    } catch (error) {
      console.error("Error fetching category:", error);
      return h.response({ message: "Failed to fetch category" }).code(500);
    }
  },
};
const getCategoryById = {
  description: "Get category by id",
  tags: ["api","category"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const categoryId = await categoryService.getCategoryById(id);

      if (!categoryId) {
        return h.response({ message: "Category not found" }).code(404);
      }
      return h.response(categoryId).code(200);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return h.response({ message: "Failed to fetch category" }).code(500);
    }
  },
};

const createCategory = {
  description: "create category",
  tags: ["api","category"],
  validate: {
    payload: validateZod(createCategorySchema),
  },
  handler: async (request, h) => {
    try {
      const createCat = await categoryService.createCategory(request.payload);
      return h.response(createCat).code(201);
    } catch (error) {
      console.error("Error creating category:", error);
      return h.response({ message: "Failed to create category" }).code(500);
    }
  },
};

const updateCategory = {
  description: "update category",
  tags: ["api","category"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateCategorySchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const updateCat = await categoryService.updateCategory(id, request.payload);
      return h.response(updateCat).code(200);
    } catch (error) {
      console.error("Error updating category:", error);
      return h.response({ message: "Failed to update category" }).code(500);
    }
  },
};

const deleteCategory = {
  description: "delete category",
  tags: ["api","category"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const deleteCat = await categoryService.deleteCategory(id);
      return h.response(deleteCat).code(200);
    } catch (error) {
      console.error("Error deleting category:", error);
      return h.response({ message: "Failed to delete category" }).code(500);
    }
  },
};
module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
