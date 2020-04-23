const theme = {
  colors: {
    white: '#ffffff',
    black: '#111111',
    green: '#06D6A0',
    yellow: '#FFD166',
    pink: '#EF476F',
    blue: '#0099FF',
    background: '#ffffff',
    darkBackground: '#fafafa',
  },
  text: {
    fontSize: {
      xs: '0.5em',
      sm: '0.75em',
      md: '1em',
      lg: '2em',
      xl: '3em',
    },
    fontWeight: {
      light: 300,
      default: 400,
      bold: 600,
    },
  },
  devices: {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
  },
};

export default theme;
export const COLORS = theme.colors;
export const DEVICES = theme.devices;
export const MEDIA = Object.entries(theme.devices).reduce((acc, cur) => {
  const [key, value] = cur;
  return { ...acc, [key]: `(min-width: ${value}px)` };
}, {});

export const scaleMargin = (width, margin = 50) => (margin * width) / 1440;
export const scaleFontSize = (width, fontSize = 200) =>
  (fontSize * width) / (1440 - scaleMargin(1440));
export const scaleOffSet = (width, offset = 20) =>
  (offset * width) / (1440 - scaleMargin(1440));
