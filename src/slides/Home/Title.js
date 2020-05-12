import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Typography from '../../components/Typography';
import { Container, ParalaxContainer } from '../../components/Layout';

import {
  DEVICES,
  generateCssMedia,
  scaleMargin,
  scale,
  COLORS,
} from '../../utils/theme';
import useMedia from '../../utils/useMedia';
import random from '../../utils/random';

const LETTER_COLORS = [COLORS.yellow, COLORS.pink, COLORS.blue, COLORS.green];

const TitleInline = ({ text, style, isSubtitle, isRandomColor }) => {
  const media = useMedia();

  const RandomColorLetterFromText = useMemo(
    () =>
      Object.values(text).map((letter, i) => (
        <span key={i + letter} style={{ color: LETTER_COLORS[random(4)] }}>
          {letter}
        </span>
      )),
    [text],
  );

  return (
    <div style={{ position: 'absolute', ...style }}>
      <Typography variant="title" fontSize={200} noMargin isScaling>
        {isRandomColor ? RandomColorLetterFromText : text}
      </Typography>
      {media >= DEVICES.laptop && isSubtitle && (
        <Typography
          variant="subtitle"
          noMargin
          style={{ textAlign: 'center', fontWeight: 'normal' }}>
          👋 Hello, I’m a JavaScript Developer !
        </Typography>
      )}
    </div>
  );
};

TitleInline.defaultProps = {
  text: '',
  style: null,
  isSubtitle: false,
  isRandomColor: false,
};

TitleInline.propTypes = {
  isRandomColor: PropTypes.bool,
  text: PropTypes.string,
  style: PropTypes.object,
  isSubtitle: PropTypes.bool,
};

const DualContainer = styled(ParalaxContainer)`
  position: relative;

  &:nth-child(2) {
    top: 200px;

    ${generateCssMedia(
      media => css`
        top: ${`${scale(media, 200) + 20}px`};
      `,
    )};
  }
`;

const TitleContainer = styled(Container)`
  overflow: hidden;

  ${generateCssMedia(
    media => css`
      padding: 0 ${`${scaleMargin(media)}px`};
    `,
  )};
`;

const SubtitleContainer = styled(ParalaxContainer)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DualText = ({ text, isRightContainer, ...props }) => {
  const media = useMedia();

  const scaleOffSet = media => scale(media, 20);

  return (
    <DualContainer {...props}>
      <TitleInline
        text={text}
        style={isRightContainer ? { right: scaleOffSet(media) } : { left: 0 }}
      />
      <TitleInline
        text={text}
        isRandomColor
        style={
          isRightContainer
            ? { top: scaleOffSet(media), right: 0 }
            : { top: scaleOffSet(media), left: scaleOffSet(media) }
        }
        isSubtitle={isRightContainer}
      />
    </DualContainer>
  );
};

DualText.defaultProps = {
  text: '',
  isRightContainer: false,
};

DualText.propTypes = {
  text: PropTypes.string,
  isRightContainer: PropTypes.bool,
};

export default function Title({ text }) {
  const media = useMedia();

  const [leftText, rightText] = text.toUpperCase().split(' ');

  return useMemo(
    () => (
      <TitleContainer isColumn>
        <>
          <DualText text={leftText} paralaxRate={-0.2} isHorizontalParalax />
          <DualText
            text={rightText}
            paralaxRate={0.5}
            isRightContainer
            isHorizontalParalax
          />
        </>
        {media < DEVICES.laptop && (
          <SubtitleContainer paralaxRate={-0.6}>
            <Typography
              variant="subtitle"
              noMargin
              style={{
                textAlign: 'center',
                fontWeight: 'normal',
              }}>
              👋 Hello, I’m a JavaScript Developer !
            </Typography>
          </SubtitleContainer>
        )}
      </TitleContainer>
    ),
    [leftText, rightText, media],
  );
}

Title.defaultProps = {
  text: '',
};

Title.propTypes = {
  text: PropTypes.string,
};
