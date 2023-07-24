const spacing = (base, limit, unit = 'px') => {
  const output = {};
  let n = 1;
  let value;

  do {
    value = base * n;
    output[value] = `${value}${unit}`;
    n++;
  } while (value <= limit);

  return output;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    borderRadius: {
      4: '4px',
      8: '8px',
      16: '16px',
      DEFAULT: '16px',
      full: '50%',
      row: '28px',
    },
    colors: {
      black: { DEFAULT: '#000000' },
      blue: { DEFAULT: '#3f5dff', hover: '#0024de' },
      'dark-black': { DEFAULT: '#1C1B22' },
      'dark-gray': { DEFAULT: '#4a4a4a' },
      gray: { DEFAULT: '#9a9a9a' },
      green: { DEFAULT: 'rgb(35, 207, 104)' },
      lightblue: { DEFAULT: '#ADD8E6', hover: '#0024de' },
      lightgray: { DEFAULT: '#e3e3e3' },
      offwhite: { DEFAULT: '#faf9f8' },
      red: { DEFAULT: '#ff5d29' },
      transparent: { DEFAULT: 'transparent' },
      white: { DEFAULT: '#FFFFFF' },
      yellow: { DEFAULT: '#ffb800', hover: '#ffa800', light: '#fff9eb' },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '8px',
        tablet: '16px',
      },
    },
    extend: {
      height: { module: 'var(--module)' },
      padding: { module: 'calc((var(--module) - 1.5em) / 2)' },
    },
    fontFamily: {
      body: ['PT Root UI', 'sans-serif'],
      display: ['PT Root UI', 'sans-serif'],
    },
    fontSize: {
      base: '16px',
      h1: 'clamp(1.875rem, 5vw, 36px)',
      h2: 'clamp(1.3rem, 3.5vw, 28px)',
      h3: '1.25rem',
      sub: '14px',
    },
    screens: {
      phone: '560px',
      tablet: '768px',
    },
    spacing: {
      0: 0,
      4: 4,
      inherit: 'inherit',
      ...spacing(8, 512),
    },
  },
};
