/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#5C6BC0',
        mint: '#00E5BE',
      },
      fontFamily: {
        heading: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        aurora: 'aurora 22s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.18)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
