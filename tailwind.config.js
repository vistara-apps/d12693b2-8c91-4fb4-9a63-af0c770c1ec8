/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(346, 80%, 58%)',
        accent: 'hsl(198, 88%, 50%)',
        bg: 'hsl(220, 12%, 10%)',
        surface: 'hsl(220, 14%, 16%)',
        'text-primary': 'hsl(220, 14%, 95%)',
        'text-secondary': 'hsl(220, 14%, 75%)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 2px 8px hsla(0, 0%, 0%, 0.1), 0 4px 20px hsla(0, 0%, 0%, 0.08)',
        focus: '0 0 0 3px hsla(198, 88%, 50%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

