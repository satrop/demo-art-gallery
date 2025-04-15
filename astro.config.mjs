// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://satrop.github.io",
  base: "/demo-art-gallery",
  build: {
    // Remove the assets option to let Astro use its default path
  },
  compressHTML: false,
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          // Handle images with custom path preservation
          assetFileNames: (assetInfo) => {
            // Preserve directory structure for image assets
            if (assetInfo.name) {
              const info = assetInfo.name.split(".");
              const extType = info[info.length - 1];

              if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
                // Keep the original path structure for images
                const path = assetInfo.name.split("/");
                const filename = path.pop();
                const directory = path.join("/");

                return directory ? `${directory}/[name].[hash][extname]` : `[name].[hash][extname]`;
              }

              // Let CSS and other assets use default path relative to base
              return "assets/[name].[hash][extname]";
            }
            return "assets/[name].[hash][extname]";
          },
        },
      },
    },
  },
});
