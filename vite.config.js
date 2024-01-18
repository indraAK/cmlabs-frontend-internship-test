import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        foods: resolve(__dirname, "foods/index.html"),
        food: resolve(__dirname, "food/index.html"),
      },
    },
  },
  server: {
    open: true,
  },
});
