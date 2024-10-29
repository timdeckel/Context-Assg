import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset-top': 'inset 0 8px 8px -4px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: "var(--baseColor)", 
        baseAccent: "var(--baseAccent)", 
        baseLight: "var(--baseLight)", 
        seconLight: "var(--secondaryLight)", 
        seconDark: "var(--secondaryDark)", 
      },
    },
  },
  plugins: [],
};
export default config;
