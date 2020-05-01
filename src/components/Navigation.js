import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useCursorBoundingMagnet, useCursorColor } from './Cursor';
import { ParalaxContainer } from './Layout';
import Typography from './Typography';

import { COLORS, generateCssMedia, scale, scaleMargin } from '../utils/theme';
import useMedia from '../utils/useMedia';

const NavigationContainer = styled(ParalaxContainer)`
  position: absolute;
  z-index: 999;
  width: initial;
  ${generateCssMedia(
    media => css`
      left: ${`${scaleMargin(media)}px`};
      top: ${`${scaleMargin(media, 25)}px`};
    `,
  )}
`;

const LinkContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: none;
  text-decoration: none;
  background-color: ${props => COLORS[props.backgroundColor]};

  ${generateCssMedia(
    media => css`
      margin: 0 ${`${scaleMargin(media, 20)}px`};
      width: ${`${scale(media, 80)}px`};
      height: ${`${scale(media, 40)}px`};
    `,
  )}
`;

const Link = ({ href, children, backgroundColor, id }) => {
  const setCursorColor = useCursorColor();

  const media = useMedia();

  const ref = useCursorBoundingMagnet(false);

  return (
    <LinkContainer
      ref={ref}
      id={id}
      backgroundColor={backgroundColor}
      href={href}
      onMouseEnter={() => setCursorColor(backgroundColor)}>
      <Typography style={{ fontSize: scale(media, 24) }}>{children}</Typography>
    </LinkContainer>
  );
};

export default function Navigation({ isBackground }) {
  const getBackgroundColor = color => (isBackground ? color : 'white');

  return (
    <NavigationContainer paralaxRate={1}>
      <Link
        href="http://localhost:8080/#home"
        id="homeLink"
        backgroundColor={getBackgroundColor('blue')}>
        🏠
      </Link>
      <Link
        href="http://localhost:8080/#bio"
        id="bioLink"
        backgroundColor={getBackgroundColor('green')}
        isBackground={isBackground}>
        👨
      </Link>
      <Link
        href="http://localhost:8080/#contact"
        id="contactLink"
        backgroundColor={getBackgroundColor('yellow')}
        isBackground={isBackground}>
        📞
      </Link>
    </NavigationContainer>
  );
}

Navigation.defaultProps = {
  isBackground: false,
};

Navigation.propTypes = {
  isBackground: PropTypes.bool,
};
