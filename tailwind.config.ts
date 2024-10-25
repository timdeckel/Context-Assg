import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
