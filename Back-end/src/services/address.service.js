const prisma = require("../utils/prisma");

const createAddress = async (userId, addressData) => {
  if (addressData.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
  return prisma.address.create({
    data: {
      ...addressData,
      userId,
    },
  });
};

const getAddressesByUserId = async (userId) => {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getAddressById = async (addressId, userId) => {
  return prisma.address.findFirst({
    where: {
      id: Number(addressId),
      userId: userId,
    },
  });
};

const updateAddress = async (addressId, userId, updateData) => {
  const numericAddressId = Number(addressId);
  const existingAddress = await prisma.address.findFirst({
    where: { id: numericAddressId, userId },
  });
  if (!existingAddress) {
    throw new Error("Address not found or access denied");
  }

  if (updateData.isDefault === true && !existingAddress.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true, NOT: { id: numericAddressId } },
      data: { isDefault: false },
    });
  }

  return prisma.address.update({
    where: { id: numericAddressId },
    data: updateData,
  });
};

const deleteAddress = async (addressId, userId) => {
  const numericAddressId = Number(addressId);
  const existingAddress = await prisma.address.findFirst({
    where: { id: numericAddressId, userId },
  });
  if (!existingAddress) {
    throw new Error("Address not found or access denied");
  }

  return prisma.address.delete({
    where: { id: numericAddressId },
  });
};

const setDefaultAddress = async (addressId, userId) => {
  const numericAddressId = Number(addressId);
  const addressToSetDefault = await prisma.address.findFirst({
    where: { id: numericAddressId, userId },
  });
  if (!addressToSetDefault) {
    throw new Error("Address not found or access denied");
  }

  if (addressToSetDefault.isDefault) {
    return addressToSetDefault;
  }

  return prisma.$transaction(async (tx) => {
    await tx.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
    const updatedAddress = await tx.address.update({
      where: { id: numericAddressId },
      data: { isDefault: true },
    });
    return updatedAddress;
  });
};

module.exports = {
  createAddress,
  getAddressesByUserId,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
