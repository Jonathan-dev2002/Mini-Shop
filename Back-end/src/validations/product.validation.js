const { z } = require("zod");

// Schema สำหรับสร้างสินค้าใหม่
const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce
    .number()
    .int()
    .min(0, "Stock cannot be negative")
    .optional()
    .default(0),
  categoryId: z.coerce
    .number()
    .int()
    .positive("Category ID must be a positive integer"), // รับเป็น string แล้วแปลงเป็น Number ที่ service
});

// Schema สำหรับอัพเดตสินค้า
const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative").optional(),
  categoryId: z.coerce
    .number()
    .int()
    .positive("Category ID must be a positive integer")
    .optional(),
});

// Schema สำหรับ validate ID พารามิเตอร์
const idParamSchema = z.object({
  // id: z.string().regex(/^\d+$/, "Invalid ID format"),
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
};
