import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Load fonts
import(/* webpackChunkName: 'font' */ '../../static/fonts/index.css');

import { DEVICES, scale, generateCssMedia } from '../utils/theme';

const TypographyProps = props => css`
  font-family: 'Nunito';
  color: ${props.color in props.theme.colors
    ? props.theme.colors[props.color]
    : props.theme.colors.black};
  font-weight: ${props.theme.text.fontWeight.default};
  font-style: normal;
  font-size: ${`${props.fontSize || props.theme.text.fontSize.md}px`};

  @media (max-width: ${`${DEVICES.tablet}px`}) {
    font-size: ${props => `${props.fontSize * 0.8}px`};
  }

  @media (max-width: ${`${DEVICES.mobileL}px`}) {
    font-size: ${props => `${props.fontSize * 0.7}px`};
  }

  @media (max-width: ${`${DEVICES.mobileM}px`}) {
    font-size: ${props => `${props.fontSize * 0.6}px`};
  }

  ${props =>
    props.isScaling &&
    generateCssMedia(
      media => css`
        font-size: ${`${scale(media, props.fontSize)}px`};
      `,
    )};

  ${props.noMargin &&
  css`
    margin: 0;
  `};
  ${props.isUnderline &&
  css`
    text-decoration: underline;
  `};
  ${props.isItalic &&
  css`
    font-style: italic;
  `};
  ${props.isExtraLight &&
  css`
    font-weight: ${props.theme.text.fontWeight.extraLight};
  `};
  ${props.isLight &&
  css`
    font-weight: ${props.theme.text.fontWeight.light};
  `};
  ${props.isBold &&
  css`
    font-weight: ${props.theme.text.fontWeight.bold};
  `};
  ${props.isExtraBold &&
  css`
    font-weight: ${props.theme.text.fontWeight.extraBold};
  `};
`;

const title = styled.h1.attrs(props => ({
  isExtraBold: true,
  fontSize: props.fontSize || props.theme.text.fontSize[props.size] || props.theme.text.fontSize.xl,
}))`
  ${TypographyProps};
  font-family: 'Montserrat';
`;

const subtitle = styled.h2.attrs(props => ({
  isBold: true,
  fontSize: props.fontSize || props.theme.text.fontSize[props.size] || props.theme.text.fontSize.lg,
}))`
  ${TypographyProps};
`;

const text = styled.p.attrs(props => ({
  fontSize: props.fontSize || props.theme.text.fontSize[props.size] || props.theme.text.fontSize.md,
}))`
  ${TypographyProps};
`;

const caption = styled.span.attrs(props => ({
  isLight: true,
  fontSize: props.fontSize || props.theme.text.fontSize[props.size] || props.theme.text.fontSize.sm,
}))`
  ${TypographyProps};
`;

const Typography = React.forwardRef(({ variant, children, ...props }, ref) => {
  const elements = { title, subtitle, text, caption };

  return React.createElement(elements[variant], { ...props, ref }, children);
});

Typography.displayName = 'Typography';
export default Typography;

Typography.defaultProps = {
  variant: 'text',
  color: null,
  size: null,
  children: null,
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['title', 'subtitle', 'text', 'caption']),
  color: PropTypes.oneOf(['white', 'green', 'yellow', 'pink', 'blue', 'black']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
};
