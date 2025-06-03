const Boom = require("@hapi/boom");
const addressService = require("../services/address.service");
const validateZod = require("../validations/validateZod");
const {
  createAddressSchema,
  updateAddressSchema,
  idParamSchema,
} = require("../validations/address.validation");

const createAddress = {
  description: "Create a new address for the authenticated user",
  tags: ["api", "address"],
  validate: {
    payload: validateZod(createAddressSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addressData = request.payload;
      const address = await addressService.createAddress(userId, addressData);
      return h.response(address).code(201);
    } catch (error) {
      console.error("Error creating address:", error);
      return Boom.internal("Failed to create address");
    }
  },
};

const getAddresses = {
  description: "Get all addresses for the authenticated user",
  tags: ["api", "address"],
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addresses = await addressService.getAddressesByUserId(userId);
      return h.response(addresses).code(200);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return Boom.internal("Failed to fetch addresses");
    }
  },
};

const getAddressById = {
  description: "Get a specific address by ID for the authenticated user",
  tags: ["api", "address"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addressId = request.params.id;
      const address = await addressService.getAddressById(addressId, userId);
      if (!address) {
        return Boom.notFound("Address not found or access denied");
      }
      return h.response(address).code(200);
    } catch (error) {
      console.error("Error fetching address by ID:", error);
      return Boom.internal("Failed to fetch address");
    }
  },
};

const updateAddress = {
  description: "Update a specific address by ID for the authenticated user",
  tags: ["api", "address"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateAddressSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addressId = request.params.id;
      const updateData = request.payload;

      const address = await addressService.updateAddress(
        addressId,
        userId,
        updateData
      );
      return h.response(address).code(200);
    } catch (error) {
      console.error("Error updating address:", error);
      if (error.message === "Address not found or access denied") {
        return Boom.notFound(error.message);
      }
      return Boom.internal("Failed to update address");
    }
  },
};

const deleteAddress = {
  description: "Delete a specific address by ID for the authenticated user",
  tags: ["api", "address"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addressId = request.params.id;
      await addressService.deleteAddress(addressId, userId);
      return h.response({ message: "Address deleted successfully" }).code(200);
    } catch (error) {
      console.error("Error deleting address:", error);
      if (error.message === "Address not found or access denied") {
        return Boom.notFound(error.message);
      }
      return Boom.internal("Failed to delete address");
    }
  },
};

const setDefaultAddress = {
  description: "Set a specific address as default for the authenticated user",
  tags: ["api", "address"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.sub);
      const addressId = request.params.id;
      const address = await addressService.setDefaultAddress(addressId, userId);
      return h.response(address).code(200);
    } catch (error) {
      console.error("Error setting default address:", error);
      if (error.message === "Address not found or access denied") {
        return Boom.notFound(error.message);
      }
      return Boom.internal("Failed to set default address");
    }
  },
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
