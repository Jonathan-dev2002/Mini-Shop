const { z } = require("zod");
const { PaymentMethod, OrderStatus } = require("@prisma/client");

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});
const createOrderSchema = z.object({
  paymentMethod: z.nativeEnum(PaymentMethod),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  phone: z.string().min(1, "Phone is required"),
});
const updateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
module.exports = {
  idParamSchema,
  createOrderSchema,
  updateStatusSchema,
};
