const spacing = (base: number, limit: number, unit = 'px') => {
  const output: Record<string, string> = {};
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
      display: ['Inter', 'PT Root UI', 'sans-serif'],
      body: ['PT Root UI', 'sans-serif'],
    },
    screens: {
      se: '370px',
      phone: '560px',
      tablet: '768px',
    },
    colors: {
      offwhite: { DEFAULT: '#F2EFDA' },
      black: { DEFAULT: '#000000' },
      white: { DEFAULT: '#FFFFFF' },
      yellow: { DEFAULT: '#ffb800', hover: '#FFA800', light: '#FFF3B2' },
      blue: { DEFAULT: '#3f5dff', hover: '#0024de' },
      lightblue: { DEFAULT: '#ADD8E6', hover: '#0024de' },
      gray: { DEFAULT: '#9a9a9a' },
      red: { DEFAULT: '#FF0202' },
      green: { DEFAULT: 'rgb(35, 207, 104)' },
      'dark-black': { DEFAULT: '#1C1B22' },
      'dark-gray': { DEFAULT: '#4a4a4a' },
      lightgray: { DEFAULT: '#e3e3e3' },
      transparent: { DEFAULT: 'transparent' },
      'darkmode-layer1': { DEFAULT: '#1d2021' },
      'darkmode-layer2': { DEFAULT: '#3c3836' },
      'darkmode-layer3': { DEFAULT: '#32302f' },
      'darkmode-border': { DEFAULT: '#665c54' },
      'darkmode-blue': { DEFAULT: '#83a598' },
      'darkmode-red': { DEFAULT: '#fb4934' },
      'darkmode-green': { DEFAULT: '#98971a' },
      'darkmode-orange': { DEFAULT: '#d65d0e' },
      'darkmode-yellow': { DEFAULT: '#d79921' },
      'darkmode-purple': { DEFAULT: '#b16286' },
      'accent-yellow': { DEFAULT: '#F7CA45' },
      'accent-orange': { DEFAULT: '#FF7300' },
      'accent-green': { DEFAULT: '#8BD460' },
      'accent-blue': { DEFAULT: '#7AB8F1' },
    },
    fontSize: {
      sub: '14px',
      base: '16px',
      h1: [
        'clamp(32px, 5vw, 42px)',
        { letterSpacing: '-0.03em', lineHeight: '1.1', fontWeight: '800' },
      ],
      h2: [
        'clamp(24px, 3.5vw, 36px)',
        { letterSpacing: '-0.03em', lineHeight: '1.1', fontWeight: '800' },
      ],
      h3: [
        'clamp(16px, 2.5vw, 18px)',
        { letterSpacing: '-0.03em', lineHeight: '1.1', fontWeight: '800' },
      ],
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
      10: 10,
      ...spacing(8, 512),
    },
    extend: {
      height: { module: 'var(--module)' },
      padding: { module: 'calc((var(--module) - 1.5em) / 2)' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
