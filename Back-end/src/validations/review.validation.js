const { z } = require("zod");

const createReviewSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),

  comment: z.string().optional(),

  productId: z.number().int().positive({ message: "ProductId is required" }),
});

const updateReviewSchema = z.object({
  
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional().nullable(),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  idParamSchema,
};
