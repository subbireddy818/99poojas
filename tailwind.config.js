/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sacred: {
          50: '#FFFDF7',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        vermilion: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          950: '#450A0A',
        },
        temple: {
          bg: '#FAF7F2',
          darkBg: '#0F172A',
          card: '#FFFFFF',
          darkCard: '#1E293B',
          border: '#F3E8D8',
          darkBorder: '#334155',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'sacred': '0 10px 25px -5px rgba(220, 38, 38, 0.1), 0 8px 10px -6px rgba(217, 119, 6, 0.1)',
        'sacred-lg': '0 20px 35px -5px rgba(220, 38, 38, 0.15), 0 10px 15px -5px rgba(217, 119, 6, 0.12)',
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
};
