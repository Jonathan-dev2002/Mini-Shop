require("dotenv").config({ path: ".env" });

const Hapi = require("@hapi/hapi");
const { prismaPlugin } = require("./src/plugins/prisma");
const routes = require("./src/routes");
const { swaggerPlugin } = require("./src/plugins/swagger");
const { authPlugin } = require("./src/plugins/auth");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        },
      },
      cors: {
        origin: ["http://localhost:3001"], // ให้ตรงกับ URL Nuxt Dev Server
        credentials: true,
      },
    },
  });

  await server.register(prismaPlugin);
  await server.register(swaggerPlugin);
  await server.register(authPlugin);
  // url: '/documentation',

  server.route(routes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
