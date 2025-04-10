// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://satrop.github.io",
  base: "/demo-art-gallery",
  build: {
    assets: "assets",
  },
  compressHTML: false,
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
