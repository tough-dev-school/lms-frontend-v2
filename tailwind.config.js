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
  theme: {
    fontFamily: {
      display: 'serif',
      body: 'sans-serif',
    },
    colors: {
      black: { DEFAULT: '#000000' },
      white: { DEFAULT: '#FFFFFF' },
      yellow: { DEFAULT: '#ffb800', hover: '#ffa800' },
      blue: { DEFAULT: '#3f5dff', hover: '#0024de' },
      gray: { DEFAULT: '#9a9a9a' },
      red: { DEFAULT: 'red' },
    },
    fontSize: {
      sub: '14px',
      base: '16px',
      h1: '36px',
      h2: '24px',
      h3: '16px',
    },
    borderRadius: {
      DEFAULT: '16px',
      row: '28px',
      full: '50%',
    },
    spacing: {
      0: 0,
      4: 4,
      ...spacing(8, 512),
    },
    extend: {},
  },
  plugins: [],
};
