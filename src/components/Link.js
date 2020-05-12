import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../utils/theme';

import { MouseHoverContext } from './Cursor';

const LinkButton = styled.a`
  color: ${props => props.color};
  cursor: none;
`;

const Link = ({ alt, href, children, target, color, ...props }) => {
  const { setIsHover } = useContext(MouseHoverContext);

  return (
    <LinkButton
      href={href}
      alt={alt}
      target={target}
      color={color}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}>
      {children}
    </LinkButton>
  );
};

export default Link;

Link.defaultProps = {
  alt: null,
  href: null,
  target: '_blank',
  color: COLORS.blue,
};

Link.propTypes = {
  color: PropTypes.oneOf(Object.values(COLORS)),
  alt: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
};
