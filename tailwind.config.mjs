/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4efe6",
        cream: "#ebe4d6",
        ink: "#161411",
        muted: "#6f675c",
        line: "#d8d0c2",
        clay: "#a45c3a",
        navy: "#1b242c",
        moss: "#5d6b57",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wideish: "0.18em",
      },
    },
  },
  plugins: [],
};
