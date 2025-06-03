const { z } = require("zod");
const { PaymentMethod, OrderStatus } = require("@prisma/client");

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format").transform(Number),
});

const newShippingAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  phone: z.string().min(1, "Phone number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required").default("Thailand"),
});

// const createOrderSchema = z.object({
//   paymentMethod: z.nativeEnum(PaymentMethod),
//   shippingAddress: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(1, "Phone is required"),
// });

const createOrderSchema = z
  .object({
    paymentMethod: z.nativeEnum(PaymentMethod),
    selectedAddressId: z.number().int().positive().optional(),
    newShippingAddress: newShippingAddressSchema.optional(),
  })
  .refine(
    (data) => {
      return data.selectedAddressId || data.newShippingAddress;
    },
    {
      message:
        "Either selectedAddressId or newShippingAddress must be provided",
      path: ["selectedAddressId", "newShippingAddress"], // path ของ error
    }
  )
  .refine(
    (data) => {
      return !(data.selectedAddressId && data.newShippingAddress);
    },
    {
      message: "Cannot provide both selectedAddressId and newShippingAddress",
      path: ["selectedAddressId", "newShippingAddress"],
    }
  );
const updateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
module.exports = {
  idParamSchema,
  createOrderSchema,
  updateStatusSchema,
};
