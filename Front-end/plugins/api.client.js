import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  return {
    provide: {
      api: $fetch.create({
        baseURL: config.public.apiBase,
        credentials: "include",
        async onRequest({ options }) {
          const token = useCookie("token").value;
          if (token) {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${token}`,
            };
          }
        },
      }),
    },
  };
});
