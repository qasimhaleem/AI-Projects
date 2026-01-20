/** @type {import('tailwindcss').Config} */
export default {
    // If this line is missing, the button will do nothing!
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}