import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color scheme
        cream: "#F0EFE7",
        "dark-green": "#20310C",
        "light-green": "#65D87E",

        // Semantic aliases
        primary: "#65D87E",
        secondary: "#20310C",
        surface: "#F0EFE7",
      },
    },
  },
  plugins: [],
} satisfies Config;
