const {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} = require("../validations/category.validation");
const categoryService = require("../services/category.service");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");
const validateZod = require("../validations/validateZod");
const Boom = require("@hapi/boom");

const getAllCategory = {
  description: "Get list all category",
  tags: ["api", "category"],
  auth: false,
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
  tags: ["api", "category"],
  auth: false,
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
  tags: ["api", "category"],
  options: {
    payload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
      maxBytes: 5 * 1024 * 1024,
    },
    validate: {
      payload: validateZod(createCategorySchema.passthrough()),
    },
    handler: async (request, h) => {
      try {
        const { name } = request.payload;
        const imageFile = request.payload.image;
        let categoryData = { name };

        if (imageFile && imageFile.hapi && imageFile.hapi.filename) {

          console.log("Uploading category image to Cloudinary...");
          const result = await uploadToCloudinary(
            imageFile,
            "my_app/categories"
          );
          categoryData.imageUrl = result.url;
          categoryData.imagePublicId = result.public_id;
          console.log("Upload successful:", result.url);
        }

        const createdCategory = await categoryService.createCategory(
          categoryData
        );
        return h.response(createdCategory).code(201);
      } catch (error) {
        console.error("Error creating category:", error);
        return Boom.internal("Failed to create category", error);
      }
    },
  },
};

const updateCategory = {
  description: "Update category, optionally with a new image",
  tags: ["api", "category"],
  payload: {
    output: "stream",
    parse: true,
    multipart: true,
    allow: "multipart/form-data",
    maxBytes: 5 * 1024 * 1024,
  },
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateCategorySchema.passthrough()),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const { name } = request.payload;
      const imageFile = request.payload.image;
      let updateData = {};

      if (name) {
        updateData.name = name;
      }

      const existingCategory = await categoryService.getCategoryById(id);
      if (!existingCategory) {
        return Boom.notFound("Category not found");
      }

      if (imageFile && imageFile.hapi && imageFile.hapi.filename) {

        if (existingCategory.imagePublicId) {
          console.log(`Deleting old image: ${existingCategory.imagePublicId}`);
          try {
            await deleteFromCloudinary(existingCategory.imagePublicId);
          } catch (deleteError) {
            console.error(
              "Failed to delete old image from Cloudinary, proceeding with upload:",
              deleteError
            );
          }
        }
        console.log("Uploading new category image to Cloudinary...");
        const result = await uploadToCloudinary(imageFile, "my_app/categories");
        updateData.imageUrl = result.url;
        updateData.imagePublicId = result.public_id;
        console.log("New image upload successful:", result.url);
      }

      if (Object.keys(updateData).length === 0) {
        return h.response(existingCategory).code(200);
      }

      const updatedCategory = await categoryService.updateCategory(
        id,
        updateData
      );
      return h.response(updatedCategory).code(200);
    } catch (error) {
      console.error("Error updating category:", error);
      return Boom.internal("Failed to update category", error);
    }
  },
};

const deleteCategory = {
  description: "Delete category and its image from Cloudinary",
  tags: ["api", "category"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const categoryToDelete = await categoryService.getCategoryById(id);

      if (!categoryToDelete) {
        return Boom.notFound("Category not found");
      }

      if (categoryToDelete.imagePublicId) {
        console.log(
          `Deleting image from Cloudinary: ${categoryToDelete.imagePublicId}`
        );
        try {
          await deleteFromCloudinary(categoryToDelete.imagePublicId);
        } catch (deleteError) {
          console.error(
            "Failed to delete image from Cloudinary, proceeding with DB deletion:",
            deleteError
          );

        }
      }

      await categoryService.deleteCategory(id);
      return h.response({ message: "Category deleted successfully" }).code(200);
    } catch (error) {
      console.error("Error deleting category:", error);
      return Boom.internal("Failed to delete category", error);
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
