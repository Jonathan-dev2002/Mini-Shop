const {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
} = require("../validations/product.validation");
const productService = require("../services/product.service");
const validateZod = require("../validations/validateZod");

const getAllProduct = {
  description: "Get list all product",
  tags: ["api", "product"],
  auth: false,
  handler: async (request, h) => {
    try {
      const product = await productService.getAllProducts();
      return h.response(product).code(200);
    } catch (error) {
      console.error("Error fetching products:", error);
      return h.response({ message: "Failed to fetch products" }).code(500);
    }
  },
};

const getProductById = {
  description: "Get product by Id",
  tags: ["api","product"],
  validate: {
    params: validateZod(idParamSchema),
  },
  auth: false,
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const getIdProduct = await productService.getProductById(id);

      if (!getIdProduct) {
        return h.response({ message: "Product not found" }).code(404);
      }

      return h.response(getIdProduct).code(200);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return h.response({ message: "Failed to fetch product" }).code(500);
    }
  },
};

const createProduct = {
  description: "create new product",
  tags: ["api", "product"],
  validate: {
    payload: validateZod(createProductSchema),
  },
  handler: async (request, h) => {
    try {
      const newProduct = await productService.createProduct(request.payload);
      return h.response(newProduct).code(201);
    } catch (error) {
      console.error("Error creating product:", error);
      return h.response({ message: "Failed to create product" }).code(500);
    }
  },
};

const updateProduct = {
  description: "update product",
  tags: ["api","product"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateProductSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const updateProduct = await productService.updateProduct(
        id,
        request.payload
      );
      return h.response(updateProduct).code(200);
    } catch (error) {
      console.error("Error updating product:", error);
      return h.response({ message: "Failed to update product" }).code(500);
    }
  },
};

const deleteProduct = {
  description: "delete Product",
  tags: ["api","product"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const deleteProduct = await productService.deleteProduct(id);
      return h.response(deleteProduct).code(200);
    } catch (error) {
      console.error("Error deleting product:", error);
      return h.response({ message: "Failed to delete product" }).code(500);
    }
  },
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
