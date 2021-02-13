import { css } from 'styled-components';

const theme = {
  colors: {
    white: '#ffffff',
    black: '#111111',
    green: '#00a47a',
    yellow: '#ffdc8a',
    pink: '#ED315D',
    blue: '#0094f7',
    background: '#ffffff',
    darkBackground: '#fafafa',
  },
  text: {
    fontSize: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 32,
      xl: 64,
    },
    fontWeight: {
      extraLight: 100,
      light: 300,
      default: 400,
      bold: 600,
      extraBold: 800,
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

export const scaleMargin = (width, margin = 50, baseDevice = DEVICES.laptopL) =>
  (margin * width) / baseDevice;
export const scale = (width, value = 200, baseDevice = DEVICES.laptopL) =>
  (value * width) / (baseDevice - scaleMargin(baseDevice));

export const generateCssMedia = (fn, mediaRule = 'min-width') =>
  Object.keys(DEVICES).map(
    key => css`
      @media (${`${mediaRule}: ${DEVICES[key]}px`}) {
        ${fn(DEVICES[key])};
      }
    `,
  );
