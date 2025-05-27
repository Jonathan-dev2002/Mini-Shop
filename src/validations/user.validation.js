const { z } = require('zod');
const { Role } = require('@prisma/client');

// Schema สำหรับสร้างผู้ใช้ใหม่
const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(Role).optional(),
});

// Schema สำหรับอัพเดตข้อมูลผู้ใช้
const updateUserSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.nativeEnum(Role).optional(),
});

// Schema สำหรับ validate ID พารามิเตอร์
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
};
