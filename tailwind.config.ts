const spacing = (base: number, limit: number, unit = 'px') => {
  const output: {
    [key: string]: string;
  } = {};
  let n = 1;
  let value: number;

  do {
    value = base * n;
    output[value] = `${value}${unit}`;
    n++;
  } while (value <= limit);

  return output;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['PT Root UI', 'sans-serif'],
      body: ['PT Root UI', 'sans-serif'],
    },
    screens: {
      se: '370px',
      phone: '560px',
      tablet: '768px',
    },
    colors: {
      offwhite: { DEFAULT: '#faf9f8' },
      black: { DEFAULT: '#000000' },
      white: { DEFAULT: '#FFFFFF' },
      yellow: { DEFAULT: '#ffb800', hover: '#ffa800', light: '#fff9eb' },
      blue: { DEFAULT: '#3f5dff', hover: '#0024de' },
      lightblue: { DEFAULT: '#ADD8E6', hover: '#0024de' },
      gray: { DEFAULT: '#9a9a9a' },
      red: { DEFAULT: '#ff5d29' },
      green: { DEFAULT: 'rgb(35, 207, 104)' },
      'dark-black': { DEFAULT: '#1C1B22' },
      'dark-gray': { DEFAULT: '#4a4a4a' },
      lightgray: { DEFAULT: '#e3e3e3' },
      transparent: { DEFAULT: 'transparent' },
      'darkmode-layer1': { DEFAULT: '#1d2021' },
      'darkmode-layer2': { DEFAULT: '#3c3836' },
      'darkmode-layer3': { DEFAULT: '#32302f' },
      'darkmode-white': { DEFAULT: '#ebdbb2' },
      'darkmode-border': { DEFAULT: '#665c54' },
      'darkmode-blue': { DEFAULT: '#83a598' },
      'darkmode-red': { DEFAULT: '#fb4934' },
      'darkmode-green': { DEFAULT: '#98971a' },
      'darkmode-orange': { DEFAULT: '#d65d0e' },
      'darkmode-yellow': { DEFAULT: '#d79921' },
      'darkmode-purple': { DEFAULT: '#b16286' },
    },
    fontSize: {
      sub: '14px',
      base: '16px',
      h1: 'clamp(1.875rem, 5vw, 36px)',
      h2: 'clamp(1.3rem, 3.5vw, 28px)',
      h3: '1.25rem',
    },
    borderRadius: {
      0: '0px',
      4: '4px',
      8: '8px',
      16: '16px',
      DEFAULT: '16px',
      row: '28px',
      full: '50%',
    },
    spacing: {
      inherit: 'inherit',
      0: 0,
      4: 4,
      ...spacing(8, 512),
    },
    extend: {
      height: { module: 'var(--module)' },
      padding: { module: 'calc((var(--module) - 1.5em) / 2)' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
