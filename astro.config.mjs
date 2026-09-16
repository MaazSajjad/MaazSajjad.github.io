import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://maazsajjad.github.io",
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: "static",
  server: { port: 4321, host: true },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  devToolbar: { enabled: false },
});
