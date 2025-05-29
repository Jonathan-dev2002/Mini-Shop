const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//สร้างคำสั่งซื้อจากตะกร้าของผู้ใช้
const createOrder = async (userId, paymentMethod, shippingAddress, phone) => {
  // ดึงตะกร้าพร้อมรายการสินค้าและข้อมูลสินค้า
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // ตรวจ stock และคำนวณยอดรวม
  let totalAmount = 0;
  cart.items.forEach((item) => {
    if (item.quantity > item.product.stock) {
      throw new Error(`Insufficient stock for product ${item.product.name}`);
    }
    totalAmount += item.quantity * item.product.price;
  });

  // ทำทุกอย่างใน transaction เดียวกัน
  const initialStatus = paymentMethod === "COD" ? "CONFIRMED" : "PENDING";
  const result = await prisma.$transaction(async (tx) => {
    // สร้าง order หลัก
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

    // สร้าง orderItems
    const orderItemsData = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));
    await tx.orderItem.createMany({ data: orderItemsData });

    // อัปเดต stock ของสินค้าแต่ละชิ้น
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // เคลียร์ตะกร้า
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    // คืนข้อมูล order พร้อมรายการย่อย
    return tx.order.findUnique({
      where: { id: order.id },
      include: {
        items: { include: { product: true } },
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

//ดึงรายละเอียดคำสั่งซื้อใบเดียว (ตรวจ userId ด้วย)
const getOrderById = async (userId, orderId) => {
  return prisma.order.findFirst({
    where: { id: Number(orderId), userId },
    include: {
      items: { include: { product: true } },
    },
  });
};

const updateOrderStatus = async (userId, orderId, newStatus) => {
  
  // 1. ถ้าเป็นยกเลิก (CANCELLED) ให้คืน stock ก่อน
  if (newStatus === "CANCELLED") {
    // ดึง order พร้อม items
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: true },
    });
    if (!order) throw new Error("Order not found");

    // ทำ transaction: คืน stock แล้วอัพเดตสถานะ
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

  // กรณีอื่นๆ แค่เปลี่ยนสถานะตามปกติ
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
