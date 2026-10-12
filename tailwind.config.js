export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f5f3ed',
        muted: '#9c9a97',
        accent: '#e5484d',
        night: '#0b0b0d',
        panel: '#151517',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
