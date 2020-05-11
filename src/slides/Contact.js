import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';

import { COLORS, DEVICES } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import useWindowSize from '../utils/useWindowSize';
const colorsBackground = [COLORS.black];

const ContactContainer = styled(Container)`
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

export default function Contact({ isTransitionSlide, slideId, setSlideView }) {
  const handleMouseColor = useCursorColor();
  const { width } = useWindowSize();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref, { threshold: 0.4 });

  useEffect(() => {
    if (isInViewport) {
      setSlideView('Contact');
      window.document.body.style.setProperty('background-color', COLORS.black);
    }
  }, [isInViewport, setSlideView]);

  return (
    <>
      <a id={slideId} />
      <ContactContainer
        ref={ref}
        isCenter
        isLarge={isTransitionSlide}
        backgroundColor={COLORS.darkBackground}
        onMouseEnter={() => handleMouseColor('pink')}>
        <Background
          colors={colorsBackground}
          numberOfWaves={1}
          isLarge={isTransitionSlide}
          offset={width <= DEVICES.laptop ? 100 : 0}
          zIndex={1}
        />
        <ContactContent paralaxRate={-0.1} isCenter isColumn zIndex={0}>
          <Typography variant="title" size="xl">
            CONTACT
          </Typography>
        </ContactContent>
      </ContactContainer>
    </>
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
