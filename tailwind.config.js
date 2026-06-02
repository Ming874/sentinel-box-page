/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#1d4ed8',    // blue-700
          light: '#60a5fa',   // blue-400
        },
        secondary: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#047857',    // emerald-700
          light: '#34d399',   // emerald-400
        },
        accent: {
          DEFAULT: '#f59e0b', // amber-500
        },
        background: '#f8fafc', // slate-50
        surface: '#ffffff',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
