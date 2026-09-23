/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050b16',
        panel: '#0d1728',
        panelAlt: '#101d33',
        accent: '#67e8f9',
        primary: '#60a5fa',
        violet: '#8b5cf6',
        emerald: '#34d399',
        warning: '#fbbf24',
        danger: '#f87171'
      },
      boxShadow: {
        glow: '0 0 30px rgba(96,165,250,0.25)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
