import { type Config } from 'tailwindcss';

const spacing = (base: number, limit: number, unit = 'px') => {
  const output = {};
  let n = 1;
  let value: number;

  do {
    value = base * n;
    output[value] = `${value}${unit}`;
    n++;
  } while (value <= limit);

  return output;
};

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['PT Root UI', 'sans-serif'],
      body: ['PT Root UI', 'sans-serif'],
    },
    screens: {
      phone: '560px',
      tablet: '768px',
    },
    colors: {
      'darkmode-layer1': { DEFAULT: '#1d2021' },
      'darkmode-layer2': { DEFAULT: '#3c3836' },
      'darkmode-white': { DEFAULT: '#ebdbb2' },
      'darkmode-border': { DEFAULT: '#665c54' },
      'darkmode-blue': { DEFAULT: '#83a598' },
      'darkmode-red': { DEFAULT: '#fb4934' },
      black: { DEFAULT: '#000000' },
      blue: { DEFAULT: '#3f5dff', hover: '#0024de' },
      gray: { DEFAULT: 'rgb(218, 216, 206)' },
      green: { DEFAULT: 'rgb(35, 207, 104)' },
      lightblue: { DEFAULT: '#ADD8E6', hover: '#0024de' },
      lightgray: { DEFAULT: '#e3e3e3' },
      offwhite: { DEFAULT: '#faf9f8' },
      red: { DEFAULT: '#ff5d29' },
      transparent: { DEFAULT: 'transparent' },
      white: { DEFAULT: '#FFFFFF' },
      yellow: { DEFAULT: '#ffb800', hover: '#ffa800', light: '#fff9eb' },
    },
    fontSize: {
      sub: '14px',
      base: '16px',
      h1: 'clamp(1.875rem, 5vw, 36px)',
      h2: 'clamp(1.3rem, 3.5vw, 28px)',
      h3: '1.25rem',
    },
    borderRadius: {
      4: '4px',
      8: '8px',
      16: '16px',
      DEFAULT: '16px',
      row: '28px',
      full: '50%',
    },
    spacing: {
      inherit: 'inherit',
      '0': '0px',
      '4': '4px',
      ...spacing(8, 512),
    },
    extend: {
      height: { module: 'var(--module)' },
      padding: { module: 'calc((var(--module) - 1.5em) / 2)' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;