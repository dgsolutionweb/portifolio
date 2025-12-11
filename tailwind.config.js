/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                primary: '#ffffff',
                secondary: '#888888',
                accent: '#ffffff',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
            spacing: {
                xs: '0.5rem',
                sm: '1rem',
                md: '2rem',
                lg: '4rem',
                xl: '8rem',
            }
        },
    },
    plugins: [],
}
