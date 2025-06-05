const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (categoryId) => {
  const whereClause = {};

  if (categoryId) {
    const numericCategoryId = Number(categoryId);
    if (!isNaN(numericCategoryId)) {
      whereClause.categoryId = numericCategoryId;
    } else {
      console.warn(
        `Invalid categoryId format: ${categoryId}. Fetching all products.`
      );
    }
  }

  return await prisma.product.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: {
      createdAt: "desc",
    },
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
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
  };
  return await prisma.product.create({ data: payload });
};

const updateProduct = async (id, data) => {
  const payload = { ...data };
  if (data.categoryId !== undefined) {
    payload.categoryId = Number(data.categoryId);
  }

  // if (data.name !== undefined) payload.name = data.name;
  // if (data.description !== undefined) payload.description = data.description;
  // if (data.price !== undefined) payload.price = data.price;
  // if (data.stock !== undefined) payload.stock = data.stock;
  // if (data.categoryId !== undefined)
  //   payload.categoryId = Number(data.categoryId);

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
