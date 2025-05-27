const { z } = require('zod');

const addToCartSchema = z.object({
  productId: z.string().regex(/^\d+$/, "Invalid product ID"),
  quantity:  z.number().int().min(1, "Quantity must be at least 1"),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  addToCartSchema,
  idParamSchema,
};
