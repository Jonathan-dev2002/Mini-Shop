const { z } = require('zod');

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  idParamSchema,
};
