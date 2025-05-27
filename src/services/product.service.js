const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: { category: true },
  });
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });
};

const createProduct = async (data) => {
  const payload = {
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock ?? 0,
    categoryId: Number(data.categoryId),
  };
  return await prisma.product.create({ data: payload });
};

const updateProduct = async (id, data) => {
  const payload = {};

  if (data.name !== undefined) payload.name = data.name;
  if (data.description !== undefined) payload.description = data.description;
  if (data.price !== undefined) payload.price = data.price;
  if (data.stock !== undefined) payload.stock = data.stock;
  if (data.categoryId !== undefined)
    payload.categoryId = Number(data.categoryId);

  return await prisma.product.update({
    where: { id: Number(id) },
    data: payload,
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
