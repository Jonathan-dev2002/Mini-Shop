const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//สร้างคำสั่งซื้อจากตะกร้าของผู้ใช้
const createOrder = async (userId) => {
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
  const result = await prisma.$transaction(async (tx) => {
    // สร้าง order หลัก
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
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

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
};
