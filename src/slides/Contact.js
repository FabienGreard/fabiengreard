import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Background, { BackgroundPolygon } from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';
import Link from '../components/Link';

import { COLORS, DEVICES, generateCssMedia, scaleMargin } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import useMedia from '../utils/useMedia';
import { email } from '../utils/config';

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
  height: 50%;

  ${generateCssMedia(
    media => css`
      padding: 0 ${`${scaleMargin(media, 100)}px`};
    `,
  )};
`;

const ContactFootter = styled(Container)`
  position: absolute;
  bottom: 0;
  width: auto;

  ${generateCssMedia(
    media => css`
      margin: ${`${scaleMargin(media, 20)}px`} ${`${scaleMargin(media, 25)}px`};
    `,
  )};
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
        zIndex={2}>
        <ContactFootter onMouseOver={() => handleMouseColor('white')}>
          <Typography variant="caption" isBold color="white">
            Made with ❤️ from France
          </Typography>
        </ContactFootter>
      </Background>
      <BackgroundPolygon
        isLarge={isTransitionSlide}
        paralaxRate={-0.15}
        zIndex={0}
        numberOfPolygons={media >= DEVICES.tablet ? 20 : 15}
      />
      <ContactContent paralaxRate={-0.1} isCenter isColumn zIndex={2}>
        <Typography variant="subtitle" style={{ textAlign: 'center' }}>
          Available for{' '}
          <Link
            href={`mailto:${email}`}
            alt="mailto"
            color={COLORS.green}
            onMouseOver={() => handleMouseColor('green')}
            onMouseOut={() => handleMouseColor('pink')}>
            hire
          </Link>{' '}
          or for any{' '}
          <Link
            href={`mailto:${email}`}
            alt="mailto"
            color={COLORS.blue}
            onMouseOver={() => handleMouseColor('blue')}
            onMouseOut={() => handleMouseColor('pink')}>
            freelance
          </Link>{' '}
          gig
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
