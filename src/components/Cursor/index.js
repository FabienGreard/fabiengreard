import React, { useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import styled, { keyframes, css } from 'styled-components';

import useMouseCoords from '../../utils/useMouseCoords';
import hexToRgb from '../../utils/hexToRgb';
import { COLORS } from '../../utils/theme';

import {
  MouseHoverContext,
  MouseHoverProvider,
  CursorColorContext,
  CursorColorProvider,
} from './contexts';
import { useCursorColor, useCursorBoundingMagnet } from './hooks';

const MOUSE_TRACKER_SIZE = [40, 40];

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99999;
`;

const AnimatedContainer = animated(Container);

const selectColor = props =>
  props.theme.colors[props.color] || props.theme.colors.pink;

const Pointer = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${selectColor};
  transition: background-color 0.5s;
`;

const pulse = color => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${hexToRgb(color).toString()}, 0.4);
  }
  70% {
      box-shadow: 0 0 0 ${MOUSE_TRACKER_SIZE[0]}px rgba(${hexToRgb(
  color,
).toString()}, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(${hexToRgb(color).toString()}, 0);
  }
`;

const Circle = styled.div`
  border-radius: 50%;
  border: 1px solid ${selectColor};
  transition: border-color 0.5s;
  box-sizing: border-box;
  ${props =>
    props.isHover &&
    css`
      background: ${props => `rgba(${hexToRgb(selectColor(props))}, 0.4)`};
    `};
  ${props =>
    props.isAnimated &&
    css`
      animation: ${props => pulse(selectColor(props))} 1s infinite;
    `}
`;

const AnimatedCircle = animated(Circle);

const Cursor = ({ color }) => {
  const { x, y } = useMouseCoords();

  const { isHover, isMagnet, magnetCoords, magnetSize } = useContext(
    MouseHoverContext,
  );

  const { color: colorContext, setColor } = useContext(CursorColorContext);

  useEffect(() => {
    window.document.body.style.setProperty('cursor', 'none', 'important');
    return () =>
      window.document.body.style.setProperty('cursor', 'inherit', 'important');
  }, []);

  useEffect(() => {
    setColor(color);
  }, [setColor, color]);

  const isXYInViewport = useMemo(() => {
    const offset = 0.99;

    if (
      x >= window.innerWidth * offset ||
      x <= window.innerWidth * (1 - offset)
    ) {
      return 0;
    }

    if (
      y >= window.innerHeight * offset ||
      y <= window.innerHeight * (1 - offset)
    ) {
      return 0;
    }

    return 1;
  }, [x, y]);

  const { xy, opacity, size } = useSpring({
    xy: isMagnet ? magnetCoords : [x, y],
    opacity: isXYInViewport,
    size: isMagnet ? magnetSize : MOUSE_TRACKER_SIZE,
    config: config.stiff,
  });

  const followTranslate = (x, y) =>
    `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

  return useMemo(
    () => (
      <AnimatedContainer style={{ opacity }}>
        <Pointer
          color={colorContext || color}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`,
          }}
        />
        <AnimatedCircle
          color={colorContext || color}
          isAnimated={isMagnet && isHover}
          isHover={!isMagnet && isHover}
          style={{
            transform: xy.interpolate(followTranslate),
            width: size.interpolate(width => `${width}px`),
            height: size.interpolate((_, height) => `${height}px`),
            borderRadius: isMagnet ? '35px' : '50%',
          }}
        />
      </AnimatedContainer>
    ),
    [color, colorContext, isHover, isMagnet, opacity, size, x, xy, y],
  );
};

Cursor.defaultProps = {
  color: 'pink',
};

Cursor.propTypes = {
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

export default Cursor;
export {
  CursorColorContext,
  CursorColorProvider,
  MouseHoverContext,
  MouseHoverProvider,
  useCursorBoundingMagnet,
  useCursorColor,
};
