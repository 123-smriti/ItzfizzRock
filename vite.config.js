import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// base "./" = relative asset paths, so it works on GitHub Pages under /<repo-name>/
export default defineConfig({ base: "./", plugins: [react(), tailwindcss()] });
