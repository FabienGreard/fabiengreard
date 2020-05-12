import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background, { BackgroundPolygon } from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';

import { COLORS, DEVICES } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import useMedia from '../utils/useMedia';
const colorsBackground = [COLORS.black];

const ContactContainer = styled(Container)`
  position: relative;
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

const ContactContent = styled(ParalaxContainer)`
  height: 100%;
`;

export default function Contact({ isTransitionSlide, setSlideView }) {
  const handleMouseColor = useCursorColor();
  const media = useMedia();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref, { threshold: 0.4 });

  useEffect(() => {
    if (isInViewport) {
      setSlideView('Contact');
      window.document.body.style.setProperty('background-color', COLORS.black);
    }
  }, [isInViewport, setSlideView]);

  return (
    <ContactContainer
      ref={ref}
      isCenter
      isLarge={isTransitionSlide}
      backgroundColor={COLORS.darkBackground}
      onMouseEnter={() => handleMouseColor('pink')}
      zIndex={3}>
      <Background
        colors={colorsBackground}
        numberOfWaves={1}
        isLarge={isTransitionSlide}
        offset={media >= DEVICES.tablet ? 0 : 100}
        zIndex={1}
      />
      <BackgroundPolygon
        isLarge={isTransitionSlide}
        paralaxRate={-0.15}
        zIndex={0}
        numberOfPolygons={media >= DEVICES.tablet ? 20 : 10}
      />
      <ContactContent paralaxRate={-0.1} isCenter isColumn zIndex={0}>
        <Typography variant="title" size="xl">
          CONTACT
        </Typography>
      </ContactContent>
    </ContactContainer>
  );
}

Contact.defaultProps = {
  setSlideView: null,
  slideId: '',
  isTransitionSlide: false,
};

Contact.propTypes = {
  setSlideView: PropTypes.func,
  slideId: PropTypes.string,
  isTransitionSlide: PropTypes.bool,
};
