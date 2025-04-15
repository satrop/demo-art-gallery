// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://satrop.github.io",
  base: "/demo-art-gallery",
  build: {
    assets: "_assets", // Using a prefixed name to avoid conflicts
  },
  compressHTML: false,
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // Preserve directory structure for image assets
            if (assetInfo.name) {
              const info = assetInfo.name.split(".");
              const extType = info[info.length - 1];

              if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
                // Keep the original path structure
                const path = assetInfo.name.split("/");
                const filename = path.pop();
                const directory = path.join("/");

                return directory ? `${directory}/[name].[hash][extname]` : `[name].[hash][extname]`;
              }
            }
            return "_assets/[name].[hash][extname]";
          },
        },
      },
    },
  },
});
