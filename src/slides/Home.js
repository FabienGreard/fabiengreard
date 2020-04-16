import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';
import Button from '../components/Button';

import { COLORS, MEDIA } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const colorsBackground = [COLORS.darkBackground, COLORS.pink];

const HomeContainer = styled(Container)`
  min-height: ${props => (props.isLarge ? '120vh' : '90vh')};
  background-color: ${props => props.backgroundColor || props.theme.background};

  @media ${MEDIA.laptopL} {
    min-height: ${props => (props.isLarge ? '130vh' : '100vh')};
  }
`;

const HomeContent = styled(ParalaxContainer)``;

export default function Home({ isTransitionSlide }) {
  const handleMouseColor = useCursorColor();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref);

  useEffect(() => {
    if (isInViewport) {
      window.document.body.style.setProperty(
        'background-color',
        COLORS.background,
      );
    }
  }, [isInViewport]);

  return (
    <HomeContainer
      ref={ref}
      isCenter
      isLarge={isTransitionSlide}
      backgroundColor={COLORS.background}
      onMouseOver={() => handleMouseColor('pink')}>
      <Background
        isBackground
        colors={colorsBackground}
        numberOfWaves={2}
        isLarge={isTransitionSlide}
        zIndex={1}
      />
      <HomeContent paralaxRate={0.2} zIndex={0} isCenter isColumn>
        <Typography variant="title" size="xl">
          HOME
        </Typography>
        <Button />
      </HomeContent>
    </HomeContainer>
  );
}

Home.defaultProps = {
  slideId: 0,
  isTransitionSlide: false,
};

Home.propTypes = {
  slideId: PropTypes.number,
  isTransitionSlide: PropTypes.bool,
};
