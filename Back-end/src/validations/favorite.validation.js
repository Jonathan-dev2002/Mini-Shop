const { z } = require("zod");

const favoriteActionSchema = z.object({
  productId: z.number().int().positive("ProductId must be a positive integer"),
});

const productIdParamSchema = z.object({
  productId: z.coerce
    .number()
    .int()
    .positive("ProductId must be a positive integer"),
});

module.exports = {
  favoriteActionSchema,
  productIdParamSchema,
};
