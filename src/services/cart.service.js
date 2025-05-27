const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }
  return cart;
};

const getCartItems = async (userId) => {
  const cart = await getOrCreateCart(userId);
  return prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
  });
};

const addItemToCart = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }, //โดยเอาจำนวนเดิม (existing.quantity) บวกกับจำนวนที่ผู้ใช้เพิ่งส่งมา (quantity)
    });
  } 
  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
  });
};

const updateCartItem = async (id, quantity) => {
  return prisma.cartItem.update({
    where: { id: Number(id) },
    data: { quantity },
  });
};

const removeCartItem = async (id) => {
  return prisma.cartItem.delete({ where: { id: Number(id) } });
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};
