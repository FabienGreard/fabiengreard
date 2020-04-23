import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Typography from '../../components/Typography';
import { Container, ParalaxContainer } from '../../components/Layout';

import {
  MEDIA,
  DEVICES,
  scaleMargin,
  scaleFontSize,
  scaleOffSet,
} from '../../utils/theme';
import useMedia from '../../utils/useMedia';

const TitleInline = ({ text, style, isSubtitle }) => {
  const media = useMedia(1440);

  return (
    <div style={{ position: 'absolute', ...style }}>
      <Typography
        variant="title"
        style={{
          fontSize: `${scaleFontSize(media)}px`,
          margin: 0,
        }}>
        {text}
      </Typography>
      {media >= DEVICES.tablet && isSubtitle && (
        <Typography
          variant="subtitle"
          style={{ textAlign: 'center', fontWeight: 'normal', margin: 0 }}>
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

    ${() =>
      Object.keys(DEVICES).map(
        key => css`
          @media ${MEDIA[key]} {
            top: ${`${scaleFontSize(DEVICES[key]) + 20}px`};
          }
        `,
      )};
  }
`;

const TitleContainer = styled(Container)`
  overflow: hidden;

  ${() =>
    Object.keys(DEVICES).map(
      key => css`
        @media ${MEDIA[key]} {
          padding: 0 ${`${scaleMargin(DEVICES[key])}px`};
        }
      `,
    )};
`;

const SubtitleContainer = styled(ParalaxContainer)`
  align-items: center;
  height: 100%;
`;

export default function Title() {
  const media = useMedia(1440);

  const DualText = ({ text, isRightContainer, ...props }) => {
    const media = useMedia(1440);

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
      {media < DEVICES.tablet && (
        <SubtitleContainer paralaxRate={-0.6}>
          <Typography
            variant="subtitle"
            style={{
              textAlign: 'center',
              fontWeight: 'normal',
              margin: 0,
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
