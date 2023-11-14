import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT:colors.teal[500],
          dark:colors.teal[600],
          text:colors.gray[600],
          textDark:colors.gray[100],
          border:colors.gray[700],
          borderDark:colors.gray[500]
        },
        secondary: {
          DEFAULT:colors.amber[500],
          dark:colors.amber[600]
        },
        background:{
          DEFAULT:colors.gray[50],
          dark:'#0e1320'
        },
        foreground:{
          DEFAULT:colors.gray[50],
          dark:'#111927'
        },
        
        
        
      }
    },
    fontFamily: {
      'body': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ]
  }
},
  plugins: [],
}