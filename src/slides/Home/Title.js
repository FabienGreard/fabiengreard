import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Typography from '../../components/Typography';
import { Container, ParalaxContainer } from '../../components/Layout';

import {
  DEVICES,
  generateCssMedia,
  scaleMargin,
  scale,
} from '../../utils/theme';
import useMedia from '../../utils/useMedia';

const TitleInline = ({ text, style, isSubtitle }) => {
  const media = useMedia();

  return (
    <div style={{ position: 'absolute', ...style }}>
      <Typography variant="title" fontSize={200} noMargin>
        {text}
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
};

TitleInline.propTypes = {
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

export default function Title() {
  const media = useMedia();

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

  return (
    <TitleContainer isColumn>
      <>
        <DualText text="FABIEN" paralaxRate={-0.2} isHorizontalParalax />
        <DualText
          text="GRÉARD"
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
  );
}

Title.defaultProps = {
  text: '',
};

Title.propTypes = {
  text: PropTypes.string,
};
