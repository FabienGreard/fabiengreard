import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';

import { COLORS } from '../utils/theme';

const colorsBackground = [COLORS.darkBackground];

const BioContainer = styled(Container)`
  min-height: ${props => (props.isLarge ? '130vh' : '100vh')};
  background-color: ${props => props.backgroundColor || props.theme.background};
`;

const BioContent = styled(ParalaxContainer)``;

export default function Bio({ isTransitionSlide }) {
  const handleMouseColor = useCursorColor();

  return (
    <BioContainer
      isCenter
      isLarge={isTransitionSlide}
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
  );
}

Bio.defaultProps = {
  slideId: 0,
  isTransitionSlide: false,
};

Bio.propTypes = {
  slideId: PropTypes.number,
  isTransitionSlide: PropTypes.bool,
};
