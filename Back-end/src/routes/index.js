const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");

module.exports = [
  ...userRoutes,
  ...authRoutes,
  ...productRoutes,
  ...categoryRoutes,
  ...cartRoutes,
  ...orderRoutes,
  ...addressRoutes,
];
