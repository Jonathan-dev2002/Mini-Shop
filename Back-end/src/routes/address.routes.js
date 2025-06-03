const addressController = require("../controllers/address.controller");

module.exports = [
  {
    method: "POST",
    path: "/addresses",
    options: addressController.createAddress,
  },
  {
    method: "GET",
    path: "/addresses",
    options: addressController.getAddresses,
  },
  {
    method: "GET",
    path: "/addresses/{id}",
    options: addressController.getAddressById,
  },
  {
    method: "PUT",
    path: "/addresses/{id}",
    options: addressController.updateAddress,
  },
  {
    method: "DELETE",
    path: "/addresses/{id}",
    options: addressController.deleteAddress,
  },
  {
    method: "PUT",
    path: "/addresses/{id}/default",
    options: addressController.setDefaultAddress,
  },
];
