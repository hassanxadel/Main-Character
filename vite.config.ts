import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// @cloudflare/vite-plugin is only needed for `wrangler deploy` (production builds).
// Keep it out of the dev config to avoid conflicting SSR server setups.
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    // tanstackStart (which wraps tanstackRouter) must come BEFORE react()
    // per TanStack Router's plugin order requirement.
    tanstackStart({
      server: { entry: "server" },
    }),
    // react() enables the automatic JSX transform — fixes "React is not defined"
    // in TanStack Start's client entry which uses JSX without importing React.
    react(),
  ],
});
