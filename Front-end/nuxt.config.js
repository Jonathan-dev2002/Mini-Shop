// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcssVite from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // public: {
    //   apiBase: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3000",
    // },
    // public: {
    //   apiBase: process.env.NUXT_PUBLIC_API_URL ,
    // },
    public: {
      apiBase:"https://mini-shop-2xsa.onrender.com" ,
    },
  },
  devServer: {
    port: 3001,
  },
  plugins: ["~/plugins/api.client.js"],
  app: {
    head: {
      // update Nuxt defaults
      title: "ร้านค้าโจอี้",
      meta: [{ name: "description", content: "รายละเอียด" }],
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  },
  vite: {
    plugins: [tailwindcssVite()],
  },

  css: ["~/assets/css/input.css"],
});
