/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ThmanyahSans', 'sans-serif'],
        serif: ['ThmanyahSerif', 'serif'],
      },
      borderRadius: {
        card: '14px',
      },
      keyframes: {
        cardIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'card-in': 'cardIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
};
