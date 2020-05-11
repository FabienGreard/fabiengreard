import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Background from '../../components/Background';

import { Container, ParalaxContainer } from '../../components/Layout';
import { useCursorColor } from '../../components/Cursor';

import {
  COLORS,
  DEVICES,
  generateCssMedia,
  scaleMargin,
} from '../../utils/theme';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import useMedia from '../../utils/useMedia';

import Title from './Title';

const colorsBackground = [COLORS.darkBackground, COLORS.pink];

const HomeContainer = styled(Container)`
  height: 100%;
  min-height: ${props => (props.isLarge ? '120vh' : '90vh')};
  background-color: ${props => props.backgroundColor || props.theme.background};

  @media (min-width: ${`${DEVICES.laptopL}px`}) {
    min-height: ${props => (props.isLarge ? '130vh' : '100vh')};
  }

  @media (max-width: ${`${DEVICES.laptop}px`}) and (orientation: landscape) {
    min-height: ${props => (props.isLarge ? '120vw' : '90vw')};
  }

  @media (min-aspect-ratio: 2/1) {
    min-height: ${props => (props.isLarge ? '120vw' : '90vw')};
  }
`;

const HomeContent = styled(ParalaxContainer)`
  height: 100%;

  ${generateCssMedia(
    media => css`
      margin-top: ${`${scaleMargin(media, 175)}px`};
    `,
  )};
`;

export default function Home({ isTransitionSlide, slideId, setSlideView }) {
  const handleMouseColor = useCursorColor();
  const media = useMedia();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref, { threshold: 0.4 });

  useEffect(() => {
    if (isInViewport) {
      setSlideView('Home');
      window.document.body.style.setProperty(
        'background-color',
        COLORS.background,
      );
    }
  }, [isInViewport, setSlideView]);

  return (
    <>
      <a id={slideId} />
      <HomeContainer
        ref={ref}
        id={slideId}
        isCenter
        isLarge={isTransitionSlide}
        backgroundColor={COLORS.background}
        onMouseOver={() => handleMouseColor('pink')}>
        <Background
          offset={media >= DEVICES.tablet ? -80 : 60}
          colors={colorsBackground}
          numberOfWaves={2}
          isLarge={isTransitionSlide}
          zIndex={1}
        />
        <HomeContent paralaxRate={0.5} zIndex={0}>
          <Title />
        </HomeContent>
      </HomeContainer>
    </>
  );
}

Home.defaultProps = {
  setSlideView: null,
  slideId: '',
  isTransitionSlide: false,
};

Home.propTypes = {
  setSlideView: PropTypes.func,
  slideId: PropTypes.string,
  isTransitionSlide: PropTypes.bool,
};
