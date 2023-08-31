/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontSize: {
      base: '14px',
      large: '18px',
      xlarge: '24px',
    },
    colors: {
      'primary-500': '#001A68',
      'primary-600': '#005FB8',
      cian: '#60cdff',
      'gray-100': '#FCFCFC',
      'gray-200': '#F3F3F3',
      'gray-900': '#4F4F4F',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
