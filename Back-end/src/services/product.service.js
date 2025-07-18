const prisma = require("../utils/prisma");

const getAllProducts = async ({
  categoryId,
  search,
  minPrice,
  maxPrice,
  page,
  limit,
}) => {

  const whereClause = {};
  if (categoryId) whereClause.categoryId = categoryId;
  if (search) whereClause.name = { contains: search, mode: "insensitive" }; //insensitive ค้นหานั้นไม่สนใจตัวอักษรเล็ก/ใหญ่
  if (minPrice != null || maxPrice != null) {
    whereClause.price = {
      ...(minPrice != null && { gte: minPrice }),
      ...(maxPrice != null && { lte: maxPrice }),
    };
  }

  // total count for pagination meta
  const total = await prisma.product.count({ where: whereClause });

  const skip = (page - 1) * limit;
  const take = limit;

  // fetch paginated records
  const data = await prisma.product.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  // return both data and meta
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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
