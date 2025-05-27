const { z } = require('zod');

// Schema สำหรับสร้างสินค้าใหม่
const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().min(0, "Stock cannot be negative").optional(),
  categoryId: z.string().regex(/^\d+$/, "Invalid category ID")  // รับเป็น string แล้วแปลงเป็น Number ที่ service
});

// Schema สำหรับอัพเดตสินค้า
const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  stock: z.number().int().min(0, "Stock cannot be negative").optional(),
  categoryId: z.string().regex(/^\d+$/, "Invalid category ID").optional()
});

// Schema สำหรับ validate ID พารามิเตอร์
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
};