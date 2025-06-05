const {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
} = require("../validations/product.validation");
const productService = require("../services/product.service");
const validateZod = require("../validations/validateZod");
const Boom = require("@hapi/boom");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

const getAllProduct = {
  description: "Get list all product",
  tags: ["api", "product"],
  auth: false,
  handler: async (request, h) => {
    try {
      const { categoryId } = request.query;

      const product = await productService.getAllProducts(categoryId);
      return h.response(product).code(200);
    } catch (error) {
      console.error("Error fetching products:", error);
      return h.response({ message: "Failed to fetch products" }).code(500);
    }
  },
};

const getProductById = {
  description: "Get product by Id",
  tags: ["api", "product"],
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
  payload: {
    output: "stream",
    parse: true,
    multipart: true,
    allow: "multipart/form-data",
    maxBytes: 10 * 1024 * 1024, // 10MB
  },
  validate: {
    payload: validateZod(createProductSchema.passthrough()),
  },
  handler: async (request, h) => {
    try {
      const { name, description, price, stock, categoryId } = request.payload;
      const imageFile = request.payload.image;

      let productData = {
        name,
        description,
        price: parseFloat(price),
        stock: stock !== undefined ? parseInt(stock, 10) : 0,
        categoryId: Number(categoryId),
      };

      if (imageFile && imageFile.hapi && imageFile.hapi.filename) {
        console.log("Uploading product image to Cloudinary...");
        const result = await uploadToCloudinary(imageFile, "my_app/products"); // โฟลเดอร์สำหรับรูปสินค้า
        productData.imageUrl = result.url;
        productData.imagePublicId = result.public_id;
        console.log("Product image upload successful:", result.url);
      }

      const newProduct = await productService.createProduct(productData);
      return h.response(newProduct).code(201);
    } catch (error) {
      console.error("Error creating product:", error);
      return Boom.internal("Failed to create product", error.message);
    }
  },
};

const updateProduct = {
  description: "Update product, optionally with a new image",
  tags: ["api", "product"],
  payload: {
    output: "stream",
    parse: true,
    multipart: true,
    allow: "multipart/form-data",
    maxBytes: 10 * 1024 * 1024,
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const { name, description, price, stock, categoryId } = request.payload;
      const imageFile = request.payload.image;

      let updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = parseFloat(price);
      if (stock !== undefined) updateData.stock = parseInt(stock, 10);
      if (categoryId !== undefined) updateData.categoryId = Number(categoryId);

      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        return Boom.notFound("Product not found");
      }

      if (imageFile && imageFile.hapi && imageFile.hapi.filename) {
        if (existingProduct.imagePublicId) {
          console.log(
            `Deleting old product image: ${existingProduct.imagePublicId}`
          );
          try {
            await deleteFromCloudinary(existingProduct.imagePublicId);
          } catch (deleteError) {
            console.error(
              "Failed to delete old product image from Cloudinary:",
              deleteError
            );
          }
        }
        console.log("Uploading new product image to Cloudinary...");
        const result = await uploadToCloudinary(imageFile, "my_app/products");
        updateData.imageUrl = result.url;
        updateData.imagePublicId = result.public_id;
        console.log("New product image upload successful:", result.url);
      }
      const updatedProduct = await productService.updateProduct(id, updateData);
      return h.response(updatedProduct).code(200);
    } catch (error) {
      console.error("Error updating product:", error);
      return Boom.internal("Failed to update product", error.message);
    }
  },
};

const deleteProduct = {
  description: "Delete Product and its image from Cloudinary",
  tags: ["api", "product"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const productToDelete = await productService.getProductById(id);

      if (!productToDelete) {
        return Boom.notFound("Product not found");
      }

      if (productToDelete.imagePublicId) {
        console.log(
          `Deleting product image from Cloudinary: ${productToDelete.imagePublicId}`
        );
        try {
          await deleteFromCloudinary(productToDelete.imagePublicId);
        } catch (deleteError) {
          console.error(
            "Failed to delete product image from Cloudinary:",
            deleteError
          );
        }
      }

      await productService.deleteProduct(id);
      return h.response({ message: "Product deleted successfully" }).code(200);
    } catch (error) {
      console.error("Error deleting product:", error);
      return Boom.internal("Failed to delete product", error.message);
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
