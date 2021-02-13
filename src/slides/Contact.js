import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Background, { BackgroundPolygon } from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';
import Link from '../components/Link';

import { COLORS, DEVICES, generateCssMedia, scaleMargin, scale } from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';
import useMedia from '../utils/useMedia';
import { email, socials } from '../utils/config';

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
  align-items: baseline;
  justify-content: space-between;

  ${generateCssMedia(
    media => css`
      margin: ${`${scaleMargin(media, 20)}px`} ${`${scaleMargin(media, 25)}px`};
      width: calc(100% - ${scaleMargin(media, 25 * 2)}px);
    `,
  )};
`;

const Socials = styled(Container)`
  align-items: baseline;
  justify-content: space-between;

  ${generateCssMedia(
    media => css`
      width: ${scale(media, 100)}px;
    `,
  )};
`;

const ResponsiveSVG = styled.svg`
  ${generateCssMedia(
    media => css`
      width: ${props => `${Math.max(scale(media, props.width), props.width / 1.75)}px`};
      height: ${props => `${Math.max(scale(media, props.height), props.height / 1.75)}px`};
    `,
  )};
`;

const GithubSVG = ({ width }) => (
  <ResponsiveSVG
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="github"
    role="img"
    width={width || '496'}
    viewBox="0 0 496 512">
    <path
      fill="currentColor"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    />
  </ResponsiveSVG>
);

const StackOverflowSVG = ({ width }) => (
  <ResponsiveSVG
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="stack-overflow"
    role="img"
    width={width || '384'}
    viewBox="0 0 384 512">
    <path
      fill="currentColor"
      d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"
    />
  </ResponsiveSVG>
);

const LinkedinSVG = ({ width }) => (
  <ResponsiveSVG
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="linkedin"
    role="img"
    width={width || '448'}
    viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
    />
  </ResponsiveSVG>
);

const SOCIAL_ICONS = {
  linkedin: LinkedinSVG,
  github: GithubSVG,
  stackOverflow: StackOverflowSVG,
};

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
          <Socials>
            {Object.entries(socials).map(([social, url]) => (
              <Link
                key={social}
                href={url}
                rel="noopener noreferrer"
                color={COLORS.white}
                alt="social links"
                onMouseOver={() => handleMouseColor('white')}
                onMouseOut={() => handleMouseColor('white')}>
                {React.createElement(SOCIAL_ICONS[social], { width: 25 })}
              </Link>
            ))}
          </Socials>
        </ContactFootter>
      </Background>
      <BackgroundPolygon
        isLarge={isTransitionSlide}
        paralaxRate={-0.15}
        zIndex={0}
        numberOfPolygons={media >= DEVICES.tablet ? 20 : 15}
      />
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
