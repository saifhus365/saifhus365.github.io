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
                background: "#0a0a0f",
                foreground: "#f8fafc",
                muted: "#94a3b8",
                accent: {
                    primary: "#818cf8",
                    secondary: "#c084fc",
                    glow: "rgba(129, 140, 248, 0.5)",
                },
                glass: {
                    bg: "rgba(255, 255, 255, 0.03)",
                    border: "rgba(255, 255, 255, 0.08)",
                },
            },
            fontFamily: {
                heading: ["var(--font-outfit)"],
                body: ["var(--font-inter)"],
            },
            animation: {
                float: "float 20s infinite ease-in-out alternate",
            },
            keyframes: {
                float: {
                    "0%": { transform: "translate(0, 0) rotate(0deg)" },
                    "100%": { transform: "translate(50px, 50px) rotate(20deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
