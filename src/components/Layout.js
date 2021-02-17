import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { MouseHoverContext } from '../components/Cursor';

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
  isRelative,
  pad = 0,
  ...props
}) => {
  const ref = useRef();
  const [x, y] = useParalax(isRelative ? ref : null);

  const { setIsBlockedHover } = useContext(MouseHoverContext);

  const [{ xy }, set] = useSpring(() => ({
    xy: [x, y],
    onRest: () => setIsBlockedHover(false),
  }));

  useEffect(() => {
    setIsBlockedHover(true);
    set({ xy: [x, y] });
  }, [set, setIsBlockedHover, x, y]);

  const interpolateParalax = xy.interpolate((x, y) =>
    isHorizontalParalax
      ? `translate3D(${(pad + y) * paralaxRate}px, 0,  0)`
      : `translate3D(0, ${(pad + y) * paralaxRate}px, 0)`,
  );

  return (
    <AnimatedContainer ref={ref} style={{ transform: interpolateParalax }} {...props}>
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
  isRelative: false,
  ...Container.defaultProps,
};

ParalaxContainer.propTypes = {
  isHorizontalParalax: PropTypes.bool,
  paralaxRate: PropTypes.number,
  isRelative: PropTypes.bool,
  ...Container.propTypes,
};

Layout.defaultProps = {
  ...Container.defaultProps,
};

Layout.propTypes = {
  ...Container.propTypes,
};
