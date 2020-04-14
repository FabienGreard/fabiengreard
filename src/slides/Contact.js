import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';

import { COLORS } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const colorsBackground = [COLORS.black];

const ContactContainer = styled(Container)`
  min-height: ${props => (props.isLarge ? '130vh' : '100vh')};
  background-color: ${props => props.backgroundColor || props.theme.background};
`;

const ContactContent = styled(ParalaxContainer)``;

export default function Contact({ isTransitionSlide }) {
  const handleMouseColor = useCursorColor();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref);

  useEffect(() => {
    if (isInViewport) {
      window.document.body.style.setProperty('background-color', COLORS.black);
    }
  }, [isInViewport]);

  return (
    <ContactContainer
      ref={ref}
      isCenter
      isLarge={isTransitionSlide}
      backgroundColor={COLORS.black}
      onMouseEnter={() => handleMouseColor('pink')}>
      <Background
        background={COLORS.darkBackground}
        colors={colorsBackground}
        numberOfWaves={1}
        isLarge={isTransitionSlide}
      />
      <ContactContent paralaxRate={-0.1} isCenter isColumn>
        <Typography variant="title" size="xl">
          CONTACT
        </Typography>
      </ContactContent>
    </ContactContainer>
  );
}

Contact.defaultProps = {
  slideId: 0,
  isTransitionSlide: false,
};

Contact.propTypes = {
  slideId: PropTypes.number,
  isTransitionSlide: PropTypes.bool,
};
