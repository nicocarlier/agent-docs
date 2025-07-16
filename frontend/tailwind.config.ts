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
        // Original CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Custom color scheme
        cream: "#F0EFE7", // Main background
        "dark-green": "#20310C", // Text and navbar
        "light-green": "#65D87E", // Buttons and CTAs

        // Semantic aliases
        primary: "#65D87E", // Light green for primary actions
        secondary: "#20310C", // Dark green for secondary elements
        surface: "#F0EFE7", // Cream for backgrounds
      },
    },
  },
  plugins: [],
} satisfies Config;
