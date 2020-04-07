import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Load fonts
import '../../static/fonts/index.css';

const TypographyProps = props => css`
  font-family: 'Nunito';
  color: ${
    props.color in props.theme.colors
      ? props.theme.colors[props.color]
      : props.theme.colors.text
  };
  font-weight: ${props.theme.text.fontWeight.default};
  font-style: normal;

  ${
    props.isUnderline &&
    css`
      text-decoration: underline;
    `
  }

  ${
    props.isItalic &&
    css`
      font-style: italic;
    `
  }

  ${
    props.isBold &&
    css`
      font-weight: ${props.theme.text.fontWeight.bold};
    `
  }

  ${
    props.isLight &&
    css`
      font-weight: ${props.theme.text.fontWeight.light};
    `
  }
`;

const title = styled.h1.attrs(props => ({
  isBold: true,
  fontSize:
    props.theme.text.fontSize[props.size] || props.theme.text.fontSize.xl,
}))`
  font-size: ${props => props.fontSize};
  ${TypographyProps};
`;

const subtitle = styled.h2.attrs(props => ({
  isBold: true,
  fontSize:
    props.theme.text.fontSize[props.size] || props.theme.text.fontSize.lg,
}))`
  font-size: ${props => props.fontSize};
  ${TypographyProps};
`;

const text = styled.p.attrs(props => ({
  fontSize:
    props.theme.text.fontSize[props.size] || props.theme.text.fontSize.md,
}))`
  font-size: ${props => props.fontSize};
  ${TypographyProps};
`;

const caption = styled.span.attrs(props => ({
  isLight: true,
  fontSize:
    props.theme.text.fontSize[props.size] || props.theme.text.fontSize.sm,
}))`
  font-size: ${props => props.fontSize};
  ${TypographyProps};
`;

export default function Typography({ variant, children, ...props }) {
  const elements = { title, subtitle, text, caption };

  return React.createElement(elements[variant], props, children);
}

Typography.defaultProps = {
  variant: 'default',
  color: null,
  size: null,
  children: null,
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['title', 'subtitle', 'text', 'caption']),
  color: PropTypes.oneOf(['white', 'green', 'yellow', 'pink', 'blue']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
};
