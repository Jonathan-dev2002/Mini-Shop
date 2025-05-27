const { z } = require('zod');

// Schema สำหรับสร้างหมวดหมู่ใหม่
const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

// Schema สำหรับอัพเดตหมวดหมู่
const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
});

// Schema สำหรับ validate ID พารามิเตอร์
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
};
