/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Medical Theme Primary & Secondary (Emerald + Teal)
        "primary-200": "#059669",
        "primary-100": "#10b981",
        "secondary-200": "#0d9488",
        "secondary-100": "#0f766e",
        // Extended Medical Palette
        medical: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        slate: {
          850: '#151f32',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(5, 150, 105, 0.1), 0 8px 10px -6px rgba(5, 150, 105, 0.05)',
      }
    },
  },
  plugins: [],
}
