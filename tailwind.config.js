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
      'primary-400': '#005FB8',
      'primary-500': '#001A68',
      cian: '#60cdff',
      'green-200': '#89D185',
      'green-300': '#45AE36',
      'gray-100': '#FCFCFC',
      'gray-200': '#F3F3F3',
      'gray-400': '#bfbfbf',
      'gray-900': '#4F4F4F',
      white: '#FFFFFF',
      black: '#000000',
      transparent: '#00000000',
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
