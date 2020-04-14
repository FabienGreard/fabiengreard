import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Container } from '../components/Layout';

import Home from './Home';
import Bio from './Bio';
import Contact from './Contact';

const SlideContainer = styled(Container)``;

const SLIDES = [Home, Bio, Contact];

export default function Slides() {
  const [, setQueryString] = useState(0);

  useEffect(() => {
    if (window) {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.get('slide')) {
        const slideNumber = urlParams.get('slide');
        setQueryString(
          slideNumber >= 0 && slideNumber <= SLIDES.length ? slideNumber : 0,
        );
      }
    }
  }, []);

  return (
    <SlideContainer isColumn>
      {SLIDES.map((slide, i) =>
        React.createElement(slide, {
          key: slide.name,
          slideId: i,
          isTransitionSlide: i % 3 === 1,
        }),
      )}
    </SlideContainer>
  );
}
