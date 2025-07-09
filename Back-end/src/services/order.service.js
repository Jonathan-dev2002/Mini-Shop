const prisma = require("../utils/prisma");

//สร้างคำสั่งซื้อจากตะกร้าของผู้ใช้
const createOrder = async (userId, paymentMethod, shippingAddress, phone) => {

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }


  let totalAmount = 0;
  for (const item of cart.items) {
    if (item.quantity > item.product.stock) {
      throw new Error(`Insufficient stock for product ${item.product.name}`);
    }
    totalAmount += item.quantity * item.product.price;
  }

  const initialStatus = paymentMethod === "COD" ? "CONFIRMED" : "PENDING";
  const result = await prisma.$transaction(async (tx) => {

    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        status: initialStatus,
        paymentMethod,
        shippingAddress,
        phone,
      },
    });


    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));
    await tx.orderItem.createMany({ data: orderItemsData });

    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });


    return tx.order.findUnique({
      where: { id: order.id },
      include: {
        items: { include: { product: true } },
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });
  });

  return result;
};

const getOrdersByUser = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (userId, orderId) => {
  return prisma.order.findFirst({
    where: { id: Number(orderId), userId },
    include: {
      items: { include: { product: true } },
    },
  });
};

const updateOrderStatus = async (userId, orderId, newStatus) => {

  if (newStatus === "CANCELLED") {

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: true },
    });
    if (!order) throw new Error("Order not found");

    return await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      return tx.order.update({
        where: { id: Number(orderId) },
        data: { status: newStatus },
        include: { items: { include: { product: true } } },
      });
    });
  }

  return prisma.order.update({
    where: { id: Number(orderId) },
    data: { status: newStatus },
    include: { items: { include: { product: true } } },
  });
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
};
