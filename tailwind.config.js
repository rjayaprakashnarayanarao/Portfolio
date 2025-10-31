/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
        },
      },
      backgroundImage: {
        'grid-dark':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}


