import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSpring, animated } from 'react-spring';

import useParalax from '../utils/useParalax';

export const Container = styled.div`
  display: flex;
  width: 100%;

  ${props =>
    props.zIndex &&
    css`
      z-index: ${props.zIndex};
    `};
  ${props =>
    props.isColumn &&
    css`
      flex-direction: column;
    `};
  ${props =>
    (props.isCenter || props.isHorizontalCenter) &&
    (props.isColumn
      ? css`
          align-items: center;
        `
      : css`
          justify-content: center;
        `)};
  ${props =>
    (props.isCenter || props.isVerticalCenter) &&
    (props.isColumn
      ? css`
          justify-content: center;
        `
      : css`
          align-items: center;
        `)};
`;

const AnimatedContainer = animated(Container);

export const ParalaxContainer = ({
  children,
  paralaxRate,
  isHorizontalParalax,
  ...props
}) => {
  const [x, y] = useParalax();

  const [{ xy }, set] = useSpring(() => ({ xy: [x, y] }));

  useEffect(() => {
    set({ xy: [x, y] });
  }, [set, x, y]);

  const interpolateParalax = xy.interpolate((x, y) =>
    isHorizontalParalax
      ? `translate3D(${y * paralaxRate}px, 0,  0)`
      : `translate3D(0, ${y * paralaxRate}px, 0)`,
  );

  return (
    <AnimatedContainer style={{ transform: interpolateParalax }} {...props}>
      {children}
    </AnimatedContainer>
  );
};

const Layout = styled(Container)`
  background-color: ${props => props.theme.colors.Background};
`;

export default Layout;

Container.defaultProps = {
  isColumn: false,
  isCenter: false,
  isHorizontalCenter: false,
  isVerticalCenter: false,
  children: null,
  zIndex: null,
};

Container.propTypes = {
  zIndex: PropTypes.number,
  isColumn: PropTypes.bool,
  isCenter: PropTypes.bool,
  isHorizontalCenter: PropTypes.bool,
  isVerticalCenter: PropTypes.bool,
  children: PropTypes.node,
};

ParalaxContainer.defaultProps = {
  isHorizontalParalax: false,
  paralaxRate: 0.25,
  ...Container.defaultProps,
};

ParalaxContainer.propTypes = {
  isHorizontalParalax: PropTypes.bool,
  paralaxRate: PropTypes.number,
  ...Container.propTypes,
};

Layout.defaultProps = {
  ...Container.defaultProps,
};

Layout.propTypes = {
  ...Container.propTypes,
};
