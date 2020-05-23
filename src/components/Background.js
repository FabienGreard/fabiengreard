import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import styled from 'styled-components';
import { useCursorColor } from '../components/Cursor';

import { Container, ParalaxContainer } from '../components/Layout';

import { COLORS, DEVICES, scale } from '../utils/theme';
import useForceUpdate from '../utils/useForceUpdate';
import random from '../utils/random';
import useWindowSize from '../utils/useWindowSize';

const BackgroundContainer = styled(Container)`
  position: absolute;
  width: 100vw;
  min-height: ${props => (props.isLarge ? '120vh' : '90vh')};
  max-width: 100%;
  background-color: ${props => props.background || 'transparent'};

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

const Wave = styled.svg`
  position: absolute;
  bottom: ${props => `${props.bottom + 40}px`};

  @media (min-width: ${`${DEVICES.tablet}px`}) {
    bottom: ${props => `${props.bottom + 20}px`};
  }

  @media (min-width: ${`${DEVICES.laptop}px`}) {
    bottom: ${props => `${props.bottom}px`};
  }
`;

const WaveGap = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: ${props => `${props.height + 40}px`};
  background-color: ${props => props.color};

  @media (min-width: ${`${DEVICES.tablet}px`}) {
    height: ${props => `${props.height + 20}px`};
  }

  @media (min-width: ${`${DEVICES.laptop}px`}) {
    height: ${props => `${props.height}px`};
  }
`;

const AnimatedWave = animated(Wave);
const AnimatedPath = animated.path;

const WaveSVG = ({
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

WaveSVG.propTypes = {
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

  const ArrayOfWavesID = useMemo(
    () =>
      Array.from(
        Array(numberOfWaves),
        () => Math.random().toString(16).split('.')[1],
      ),
    [numberOfWaves],
  );

  const randomPoint = (max = 140, min = 0) =>
    `${random(max, min)},${random(max, min)}`;

  const [timestamp] = useForceUpdate(isIntervallRefresh && 5000);

  const getPoints = useMemo(
    () => ({
      point1: randomPoint(),
      point2: randomPoint(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamp],
  );

  return ArrayOfWavesID.map((id, i) => (
    <WaveSVG
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
  children,
  ...props
}) => (
  <BackgroundContainer isLarge={isLarge} background={background} {...props}>
    <GenerateWaves
      numberOfWaves={numberOfWaves}
      colors={colors}
      isIntervallRefresh
      offset={offset}
    />
    {children}
  </BackgroundContainer>
);

Background.defaultProps = {
  numberOfWaves: 2,
  background: null,
  isLarge: false,
  colors: [COLORS.darkBackground, COLORS.pink, COLORS.background],
  offset: 0,
  children: null,
};

Background.propTypes = {
  numberOfWaves: PropTypes.number,
  offset: PropTypes.number,
  background: PropTypes.oneOf(Object.values(COLORS)),
  isLarge: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.oneOf(Object.values(COLORS))),
  children: PropTypes.node,
};

export default Background;

const TriangleSVG = ({ color, rotate = 90, size, scale, pos }) => {
  const [top, left] = pos;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 54 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top,
        left,
        transform: ` ${scale} rotate(${rotate}deg)`,
        transformOrigin: 'left',
      }}>
      <path
        d="M12.8435 48.7147L21.0034 7.95423L52.2231 35.4011L12.8435 48.7147Z"
        stroke={color}
      />
    </svg>
  );
};

const SquareSVG = ({ color, rotate = 90, size, scale, pos }) => {
  const [top, left] = pos;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top,
        left,
        transform: ` ${scale} rotate(${rotate}deg)`,
        transformOrigin: 'left',
      }}>
      <path
        d="M0.707107 25L25 0.707107L49.2929 25L25 49.2929L0.707107 25Z"
        stroke={color}
      />
    </svg>
  );
};

const CircleSVG = ({ color, rotate = 90, size, scale, pos }) => {
  const [top, left] = pos;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top,
        left,
        transform: ` ${scale} rotate(${rotate}deg)`,
        transformOrigin: 'left',
      }}>
      <circle cx="25" cy="25" r="24.5" stroke={color} />
    </svg>
  );
};

const HexagonSVG = ({ color, rotate = 90, size, scale, pos }) => {
  const [top, left] = pos;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top,
        left,
        transform: `${scale} rotate(${rotate}deg)`,
        transformOrigin: 'left',
      }}>
      <path
        d="M20.0876 11.2811L41.2748 10.2425L55.2968 26.1597L51.5947 47.0468L32.9564 57.1753L13.4168 48.9183L7.68964 28.4934L20.0876 11.2811Z"
        stroke={color}
      />
    </svg>
  );
};

const PolygonsContainer = styled(ParalaxContainer)``;

const GeneratePolygons = ({ numberOfPolygons, paralaxRate }) => {
  const { width, height } = useWindowSize();

  const POLYGONS = [HexagonSVG, SquareSVG, TriangleSVG, CircleSVG];
  const POLYGON_WIDTH = scale(width, 50);
  const POLYGON_MAX_WIDTH = POLYGON_WIDTH * 1.5;
  const SCALING = 2;
  const POLYGONS_COLORS = [
    COLORS.yellow,
    COLORS.green,
    COLORS.pink,
    COLORS.blue,
  ];

  const ArrayOfPolygonsID = useMemo(
    () =>
      Array.from(
        Array(numberOfPolygons),
        () => Math.random().toString(16).split('.')[1],
      ),
    [numberOfPolygons],
  );

  return useMemo(
    () => (
      <PolygonsContainer paralaxRate={paralaxRate} isRelative>
        {ArrayOfPolygonsID.map(key =>
          React.createElement(POLYGONS[random(POLYGONS.length)], {
            key,
            size: POLYGON_WIDTH,
            color: POLYGONS_COLORS[random(POLYGONS_COLORS.length)],
            rotate: random(360),
            scale: `scale(${random(100 * SCALING) / 100})`,
            pos: [
              random(height),
              Math.max(
                random(width) - POLYGON_MAX_WIDTH * SCALING,
                POLYGON_MAX_WIDTH * SCALING,
              ),
            ],
          }),
        )}
      </PolygonsContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ArrayOfPolygonsID, width],
  );
};

GeneratePolygons.defaultProps = {
  numberOfPolygons: 10,
  paralaxRate: 1,
};

GeneratePolygons.propTypes = {
  numberOfPolygons: PropTypes.number,
  paralaxRate: PropTypes.number,
};

const BackgroundPolygonContainer = styled(Container)`
  position: absolute;
  width: 100vw;
  min-height: ${props => (props.isLarge ? '120vh' : '90vh')};
  max-width: 100%;
  background-color: ${props => props.background || 'transparent'};

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

const BackgroundPolygon = ({
  isLarge,
  numberOfPolygons,
  paralaxRate,
  ...props
}) => (
  <BackgroundPolygonContainer isLarge={isLarge} {...props}>
    <GeneratePolygons
      numberOfPolygons={numberOfPolygons}
      paralaxRate={paralaxRate}
    />
  </BackgroundPolygonContainer>
);

BackgroundPolygon.defaultProps = {
  isLarge: false,
  numberOfPolygons: 10,
  paralaxRate: 1,
};

BackgroundPolygon.propTypes = {
  isLarge: PropTypes.bool,
  numberOfPolygons: PropTypes.number,
  paralaxRate: PropTypes.number,
};

export { BackgroundPolygon };
