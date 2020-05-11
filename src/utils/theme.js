import { css } from 'styled-components';

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
      extraLight: 100,
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

export const scaleMargin = (width, margin = 50) => (margin * width) / 1440;
export const scale = (width, fontSize = 200) =>
  (fontSize * width) / (1440 - scaleMargin(1440));

export const generateCssMedia = (fn, mediaRule = 'min-width') =>
  Object.keys(DEVICES).map(
    key => css`
      @media (${`${mediaRule}: ${DEVICES[key]}px`}) {
        ${fn(DEVICES[key])};
      }
    `,
  );
