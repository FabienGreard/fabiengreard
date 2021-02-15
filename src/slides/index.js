import React, { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../components/Layout';
import Navigation, { WithAnchor } from '../components/Navigation';

import useMedia from '../utils/useMedia';
import { DEVICES } from '../utils/theme';

import Home from './Home';
import Bio from './Bio';
import Contact from './Contact';

const SlideContainer = styled(Container)``;

const SLIDES = [
  { component: Home, name: 'Home' },
  { component: Bio, name: 'Bio' },
  { component: Contact, name: 'Contact' },
].map(({ component, name }) => WithAnchor(component, name));

export default function Slides() {
  const [slideView, setSlideView] = useState();
  const media = useMedia();

  return (
    <SlideContainer isColumn>
      {media > DEVICES.tablet && <Navigation isBackground={slideView !== 'Bio'} />}

      {SLIDES.map((slide, i) =>
        React.createElement(slide, {
          setSlideView,
          key: slide.name,
          isTransitionSlide: i % 3 === 1,
        }),
      )}
    </SlideContainer>
  );
}
