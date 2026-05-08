import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a0a2e',
        'ink-2': '#6b4d8a',
        'ink-3': '#a98ec4',
        paper: '#fdf8ff',
        'paper-2': '#f5eeff',
        'paper-3': '#ead6f8',
        accent: '#7c3aed',
        'accent-2': '#db2777',
        'accent-soft': '#f3e8ff',
        rule: 'rgba(120,60,180,0.10)',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '10px',
        card: '14px',
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.25s ease both',
        blink: 'blink 1.2s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(6px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 80%, 100%': { opacity: '0.2' },
          '40%': { opacity: '1' },
        },
      },
      maxWidth: {
        chat: '720px',
      },
    },
  },
  plugins: [],
};

export default config;
