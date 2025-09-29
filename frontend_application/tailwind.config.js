/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F59E0B',
        success: '#059669',
        error: '#DC2626',
        surface: '#FFFFFF',
        background: '#F3F4F6'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,.06), 0 2px 6px rgba(0,0,0,.05)'
      },
      backgroundImage: {
        'wildlife-gradient': 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.12) 100%)'
      }
    }
  },
  plugins: []
};
