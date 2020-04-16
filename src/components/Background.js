import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import styled from 'styled-components';
import { useCursorColor } from '../components/Cursor';

import { Container } from '../components/Layout';

import { COLORS, MEDIA } from '../utils/theme';
import useForceUpdate from '../utils/useForceUpdate';
import random from '../utils/random';

const BackgroundContainer = styled(Container)`
  position: absolute;
  width: 100vw;
  min-height: ${props => (props.isLarge ? '120vh' : '90vh')};
  max-width: 100%;
  background-color: ${props => props.background || 'transparent'};

  @media ${MEDIA.laptopL} {
    min-height: ${props => (props.isLarge ? '130vh' : '100vh')};
  }
`;

const Wave = styled.svg`
  position: absolute;
  bottom: ${props => `${props.bottom + 40}px`};

  @media ${MEDIA.tablet} {
    bottom: ${props => `${props.bottom + 20}px`};
  }

  @media ${MEDIA.laptop} {
    bottom: ${props => `${props.bottom}px`};
  }
`;

const WaveGap = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: ${props => `${props.height + 40}px`};
  background-color: ${props => props.color};

  @media ${MEDIA.tablet} {
    height: ${props => `${props.height + 20}px`};
  }

  @media ${MEDIA.laptop} {
    height: ${props => `${props.height}px`};
  }
`;

const AnimatedWave = animated(Wave);
const AnimatedPath = animated.path;

const WaveSvg = ({
  color,
  point1 = '136.84,132.72',
  point2 = '328.72,17.27',
  bottom = -1,
  offset,
  ...props
}) => {
  const { path } = useSpring({
    from: {
      path:
        'M0.00,49.98 C136.84,132.72 328.72,17.27 500.00,49.98 L500.00,150.00 L0.00,150.00 Z',
    },
    to: {
      path: `M0.00,49.98 C${point1} ${point2} 500.00,49.98 L500.00,150.00 L0.00,150.00 Z`,
    },
    config: config.molasses,
  });

  const size = bottom + offset;

  return (
    <>
      <AnimatedWave
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 150"
        bottom={size}>
        <AnimatedPath
          fill={color}
          fillOpacity="1"
          d={path}
          style={{ zIndex: 2 }}
          {...props}></AnimatedPath>
      </AnimatedWave>
      <WaveGap color={color} height={size} />
    </>
  );
};

WaveSvg.propTypes = {
  color: PropTypes.oneOf(Object.values(COLORS)),
  point1: PropTypes.string,
  point2: PropTypes.string,
  bottom: PropTypes.number,
  offset: PropTypes.number,
};

const GenerateWaves = ({
  numberOfWaves,
  offset,
  colors,
  isIntervallRefresh = false,
}) => {
  const handleMouseColor = useCursorColor();

  const ArrayOfWavesID = useMemo(() => {
    return Array.from(
      Array(numberOfWaves),
      () => Math.random().toString(16).split('.')[1],
    );
  }, [numberOfWaves]);

  const randomPoint = (max = 180, min = 0) =>
    `${random(max, min)},${random(max, min)}`;

  const [timestamp] = useForceUpdate(isIntervallRefresh && 10000);

  const getPoints = useMemo(
    () => ({
      point1: randomPoint(),
      point2: randomPoint(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamp],
  );

  return ArrayOfWavesID.map((id, i) => (
    <WaveSvg
      key={id}
      onMouseMove={() => {
        if (colors[i] === COLORS.pink) {
          return handleMouseColor('white');
        }

        if (colors[i] === COLORS.black) {
          return handleMouseColor('white');
        }

        handleMouseColor('pink');
      }}
      onMouseLeave={() => {
        handleMouseColor('pink');
      }}
      color={colors[i]}
      bottom={numberOfWaves * 60 - (i + 1) * 60 - 1}
      offset={offset}
      {...getPoints}
    />
  ));
};

const Background = ({
  numberOfWaves,
  background,
  isLarge,
  offset,
  colors,
  ...props
}) => (
  <BackgroundContainer isLarge={isLarge} background={background} {...props}>
    <GenerateWaves
      numberOfWaves={numberOfWaves}
      colors={colors}
      isIntervallRefresh
      offset={offset}
    />
  </BackgroundContainer>
);

Background.defaultProps = {
  numberOfWaves: 2,
  background: null,
  isLarge: false,
  colors: [COLORS.darkBackground, COLORS.pink, COLORS.background],
  offset: 0,
};

Background.propTypes = {
  numberOfWaves: PropTypes.number,
  offset: PropTypes.number,
  background: PropTypes.oneOf(Object.values(COLORS)),
  isLarge: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.oneOf(Object.values(COLORS))),
};

export default Background;