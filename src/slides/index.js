import React, { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../components/Layout';
import Navigation from '../components/Navigation';

import Home from './Home';
import Bio from './Bio';
import Contact from './Contact';

import useMedia from '../utils/useMedia';
import { DEVICES } from '../utils/theme';

const SlideContainer = styled(Container)``;

const SLIDES = [Home, Bio, Contact];

export default function Slides() {
  const [slideView, setSlideView] = useState();
  const media = useMedia();

  return (
    <SlideContainer isColumn>
      {media > DEVICES.tablet && (
        <Navigation isBackground={slideView !== 'Bio'} />
      )}
      {SLIDES.map((slide, i) =>
        React.createElement(slide, {
          setSlideView,
          key: slide.name,
          slideId: slide.name.toLowerCase(),
          isTransitionSlide: i % 3 === 1,
        }),
      )}
    </SlideContainer>
  );
}
