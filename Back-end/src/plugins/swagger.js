const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Package = require("../../package.json");

exports.swaggerPlugin = {
  name: "swagger",
  version: "1.0.0",
  register: async function (server) {
    const swaggerOptions = {
      openapi: '3.0.0',
      info: {
        title: "Mini-Shop API Documentation",
        version: Package.version,
        description: "API Documentation for the Mini-Shop project",
      },
      grouping: "tags",
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        // *** ใช้ตัวแปร swaggerOptions ที่เราสร้างไว้ตรงนี้ ***
        options: swaggerOptions,
      },
    ]);
  },
};