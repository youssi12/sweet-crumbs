/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF8F0',
          200: '#FFF0E0',
          300: '#FFE4C8',
          400: '#FFD4A8',
          DEFAULT: '#FFF8F0',
        },
        peach: {
          50: '#FFF3EE',
          100: '#FFE4D6',
          200: '#FFCAB4',
          300: '#FFAA88',
          400: '#FF8A5C',
          500: '#F5673A',
          600: '#E04D22',
          DEFAULT: '#FFAA88',
        },
        rose: {
          50: '#FFF1F4',
          100: '#FFE0E7',
          200: '#FFC2D1',
          300: '#FF94AF',
          400: '#FF5C84',
          500: '#F5305F',
          600: '#D91A4A',
          700: '#B0103A',
          800: '#8F1033',
          DEFAULT: '#FF94AF',
        },
        blush: {
          50: '#FFF5F7',
          100: '#FFE8EE',
          200: '#FFD0DC',
          300: '#FFADC0',
          400: '#FF7A98',
          500: '#FF4D73',
          DEFAULT: '#FFD0DC',
        },
        mauve: {
          50: '#FCF5FF',
          100: '#F5E8FF',
          200: '#EAD0FF',
          300: '#D8AAFF',
          400: '#C07AFF',
          500: '#A54EF5',
          DEFAULT: '#D8AAFF',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'gradient-bakery': 'linear-gradient(135deg, #FFF8F0 0%, #FFE4D6 50%, #FFD0DC 100%)',
        'gradient-hero': 'linear-gradient(to bottom right, #FFF0E0, #FFCAB4, #FFD0DC)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,228,214,0.6))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'bakery': '0 4px 30px rgba(255, 170, 136, 0.2)',
        'bakery-lg': '0 8px 50px rgba(255, 170, 136, 0.3)',
        'card': '0 2px 20px rgba(245, 103, 58, 0.1)',
        'card-hover': '0 8px 40px rgba(245, 103, 58, 0.2)',
      },
    },
  },
  plugins: [],
}
