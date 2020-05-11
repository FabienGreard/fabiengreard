import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';

import { COLORS, DEVICES } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const colorsBackground = [COLORS.darkBackground];

const BioContainer = styled(Container)`
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

const BioContent = styled(ParalaxContainer)`
  height: 100%;
`;

export default function Bio({ isTransitionSlide, slideId, setSlideView }) {
  const handleMouseColor = useCursorColor();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref, { threshold: 0.4 });

  useEffect(() => {
    if (isInViewport) {
      setSlideView('Bio');
    }
  }, [isInViewport, setSlideView]);

  return (
    <>
      <a id={slideId} />
      <BioContainer
        ref={ref}
        isCenter
        isLarge={isTransitionSlide}
        backgroundColor={COLORS.pink}
        onMouseOver={() => handleMouseColor('white')}>
        <Background
          background={COLORS.pink}
          colors={colorsBackground}
          numberOfWaves={1}
          isLarge={isTransitionSlide}
        />
        <BioContent paralaxRate={-0.2} isCenter isColumn>
          <Typography variant="title" size="xl">
            BIO
          </Typography>
        </BioContent>
      </BioContainer>
    </>
  );
}

Bio.defaultProps = {
  setSlideView: null,
  slideId: '',
  isTransitionSlide: false,
};

Bio.propTypes = {
  setSlideView: PropTypes.func,
  slideId: PropTypes.string,
  isTransitionSlide: PropTypes.bool,
};
