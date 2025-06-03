const { z } = require('zod');

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format").transform(Number),
});

const createAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  phone: z.string().min(1, "Phone number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required").default("Thailand"),
  isDefault: z.boolean().optional().default(false),
  label: z.string().optional(),
});

const updateAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required").optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  street: z.string().min(1, "Street is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  province: z.string().optional().nullable(), // .nullable() เผื่อต้องการลบค่า
  postalCode: z.string().min(1, "Postal code is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  isDefault: z.boolean().optional(),
  label: z.string().optional().nullable(),
});

module.exports = {
  idParamSchema,
  createAddressSchema,
  updateAddressSchema,
};