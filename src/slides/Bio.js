import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Background from '../components/Background';
import Typography from '../components/Typography';
import { Container, ParalaxContainer } from '../components/Layout';
import { useCursorColor } from '../components/Cursor';
import Link from '../components/Link';

import {
  COLORS,
  DEVICES,
  generateCssMedia,
  scaleMargin,
  scale,
} from '../utils/theme';
import useIntersectionObserver from '../utils/useIntersectionObserver';

import profile from '../../static/profile.png';

const colorsBackground = [COLORS.darkBackground];

const BioContainer = styled(Container)`
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

const BioContent = styled(ParalaxContainer)`
  height: 100%;
  overflow: hidden;
  flex-direction: row;

  @media (max-width: ${`${DEVICES.tablet}px`}) {
    flex-direction: column;
  }
`;

const TextColor = styled.span`
  color: ${props => props.color};
`;

const BioTextContainer = styled(ParalaxContainer)`
  ${generateCssMedia(media =>
    media > DEVICES.tablet
      ? css`
          width: calc(50% - ${`${scaleMargin(media) * 2}px`});
          margin: 0 ${`${scaleMargin(media)}px`};
        `
      : css`
          width: calc(100% - ${`${scaleMargin(media, 100) * 2}px`});
          margin: ${`${scaleMargin(media, 100)}px`};
        `,
  )};
`;

const FeatureContainer = styled(ParalaxContainer)`
  ${generateCssMedia(media =>
    media > DEVICES.tablet
      ? css`
          width: calc(50% - ${`${scaleMargin(media) * 2}px`});
          margin: 0 ${`${scaleMargin(media)}px`};
        `
      : css`
          width: calc(100% - ${`${scaleMargin(media, 100) * 2}px`});
          margin: ${`${scaleMargin(media, 100)}px`};
        `,
  )};
`;

const TextWithIcon = styled(Container)`
  align-items: center;
  justify-content: space-around;
  flex-direction: ${props => (props.isReverse ? 'row-reverse' : 'row')};

  ${generateCssMedia(
    media => css`
      padding: ${`${scaleMargin(media)}px`} 0;
    `,
  )};

  & > p {
    ${generateCssMedia(
      media => css`
        width: ${`calc(60% - ${scaleMargin(media)}px)`};
        ${props =>
          props.isReverse
            ? css`
                margin-right: ${`${scaleMargin(media)}px`};
              `
            : css`
                margin-left: ${`${scaleMargin(media)}px`};
              `};
      `,
    )};
  }
`;

const ResponsiveSVG = styled.svg`
  ${generateCssMedia(
    media => css`
      width: ${props =>
        `${Math.max(scale(media, props.width), props.width / 1.75)}px`};
      height: ${props =>
        `${Math.max(scale(media, props.height), props.height / 1.75)}px`};
    `,
  )};
`;

const ResponsiveIMG = styled.img`
  ${generateCssMedia(
    media => css`
      width: ${props =>
        `${Math.max(scale(media, props.width), props.width / 2)}px`};
      height: ${props =>
        `${Math.max(scale(media, props.height), props.height / 2)}px`};
    `,
  )};
`;

const PhotoSVG = ({ color }) => {
  return (
    <ResponsiveSVG
      width="150"
      height="132"
      viewBox="0 0 150 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.4"
        d="M75 58.5938C69.9009 58.5938 64.9164 60.1058 60.6767 62.9387C56.437 65.7716 53.1326 69.798 51.1812 74.5089C49.2299 79.2198 48.7194 84.4036 49.7141 89.4047C50.7089 94.4057 53.1643 98.9995 56.7699 102.605C60.3755 106.211 64.9693 108.666 69.9703 109.661C74.9714 110.656 80.1552 110.145 84.8661 108.194C89.577 106.242 93.6034 102.938 96.4363 98.6983C99.2692 94.4586 100.781 89.4741 100.781 84.375C100.781 77.5374 98.065 70.9798 93.2301 66.1449C88.3952 61.31 81.8376 58.5938 75 58.5938ZM75 75C72.5157 75.007 70.1352 75.9969 68.3786 77.7536C66.6219 79.5102 65.632 81.8907 65.625 84.375C65.625 85.6182 65.1311 86.8105 64.2521 87.6896C63.373 88.5686 62.1807 89.0625 60.9375 89.0625C59.6943 89.0625 58.502 88.5686 57.6229 87.6896C56.7439 86.8105 56.25 85.6182 56.25 84.375C56.2547 79.4036 58.2316 74.6372 61.7469 71.1219C65.2622 67.6066 70.0286 65.6297 75 65.625C76.2432 65.625 77.4355 66.1189 78.3146 66.9979C79.1936 67.877 79.6875 69.0693 79.6875 70.3125C79.6875 71.5557 79.1936 72.748 78.3146 73.6271C77.4355 74.5061 76.2432 75 75 75ZM140.625 0H75L56.25 14.0625H4.6875C3.4443 14.0625 2.25201 14.5564 1.37294 15.4354C0.49386 16.3145 0 17.5068 0 18.75L0 37.5H150V9.375C149.993 6.89074 149.003 4.51021 147.246 2.75356C145.49 0.996913 143.109 0.00695768 140.625 0Z"
        fill={color}
      />
      <path
        d="M51.5625 4.6875C51.5625 3.4443 51.0686 2.25201 50.1896 1.37294C49.3105 0.49386 48.1182 0 46.875 0H18.75C17.5068 0 16.3145 0.49386 15.4354 1.37294C14.5564 2.25201 14.0625 3.4443 14.0625 4.6875V14.0625H51.5625V4.6875ZM0 37.5V117.188C0 120.917 1.48158 124.494 4.11881 127.131C6.75604 129.768 10.3329 131.25 14.0625 131.25H135.938C139.667 131.25 143.244 129.768 145.881 127.131C148.518 124.494 150 120.917 150 117.188V37.5H0ZM75 119.531C68.0468 119.531 61.2496 117.469 55.4682 113.606C49.6868 109.743 45.1808 104.253 42.5199 97.8287C39.859 91.4047 39.1628 84.336 40.5193 77.5164C41.8758 70.6967 45.2241 64.4325 50.1408 59.5158C55.0575 54.5991 61.3217 51.2508 68.1414 49.8943C74.961 48.5378 82.0297 49.234 88.4537 51.8949C94.8777 54.5558 100.368 59.0618 104.231 64.8432C108.094 70.6246 110.156 77.4218 110.156 84.375C110.156 93.699 106.452 102.641 99.8592 109.234C93.2661 115.827 84.324 119.531 75 119.531Z"
        fill={color}
      />
    </ResponsiveSVG>
  );
};

const ArticleSVG = ({ color }) => (
  <ResponsiveSVG
    width="170"
    height="114"
    viewBox="0 0 170 114"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.4"
      d="M160.556 0H28.3333C25.8285 0 23.4263 0.995037 21.6551 2.76621C19.8839 4.53739 18.8889 6.93962 18.8889 9.44445V104.541C18.8889 104.647 18.8741 104.757 18.8623 104.863C18.8623 104.925 18.8623 104.987 18.8387 105.049C18.8151 105.111 18.8151 105.244 18.8003 105.344C18.7856 105.444 18.7767 105.48 18.7649 105.545C18.7531 105.61 18.7354 105.725 18.7177 105.813C18.7 105.902 18.6852 105.949 18.6705 106.017C18.6557 106.085 18.6321 106.191 18.6085 106.274C18.5849 106.356 18.5701 106.409 18.5524 106.477L18.4816 106.725L18.4107 106.926C18.3842 107.009 18.3576 107.088 18.3281 107.168C18.2986 107.248 18.2779 107.301 18.2514 107.366C18.2248 107.431 18.1894 107.522 18.1569 107.599C18.1245 107.676 18.0979 107.732 18.0684 107.797C18.0389 107.861 18.0005 107.947 17.9651 108.021L17.8677 108.213C17.8293 108.286 17.7939 108.357 17.7526 108.431L17.6463 108.617L17.5224 108.83L17.4073 109.01C17.363 109.077 17.3187 109.145 17.2715 109.213L17.1475 109.39L17.0059 109.585C16.9616 109.644 16.9173 109.7 16.8701 109.756C16.8229 109.812 16.7727 109.883 16.7196 109.945L16.5779 110.107L16.4186 110.288L16.268 110.444C16.2149 110.503 16.1588 110.559 16.0998 110.618L15.9434 110.766L15.7663 110.931L15.604 111.073L15.421 111.226L15.2498 111.362L15.058 111.506L14.8809 111.633L14.6802 111.769C14.6212 111.81 14.5592 111.849 14.4972 111.887L14.2936 112.014L14.1017 112.123C14.0338 112.162 13.963 112.203 13.8922 112.238L13.6944 112.339C13.6236 112.377 13.5528 112.413 13.479 112.445L13.2753 112.536L13.0569 112.631L12.8474 112.714L12.6201 112.799L12.4076 112.87L12.1774 112.944L11.9561 113.006L11.7229 113.068L11.4986 113.118L11.2595 113.168L11.0323 113.209L10.7903 113.245L10.5571 113.274L10.3121 113.301L10.0731 113.319H9.58609H155.833C159.591 113.319 163.194 111.826 165.851 109.169C168.507 106.512 170 102.909 170 99.1519V9.44445C170 6.93962 169.005 4.53739 167.234 2.76621C165.463 0.995037 163.06 0 160.556 0ZM89.7222 90.9028C89.7222 91.8421 89.3491 92.7429 88.6849 93.4071C88.0207 94.0713 87.1199 94.4445 86.1805 94.4445H41.3194C40.3801 94.4445 39.4793 94.0713 38.8151 93.4071C38.1509 92.7429 37.7778 91.8421 37.7778 90.9028V88.5417C37.7778 87.6024 38.1509 86.7015 38.8151 86.0373C39.4793 85.3731 40.3801 85 41.3194 85H86.1805C87.1199 85 88.0207 85.3731 88.6849 86.0373C89.3491 86.7015 89.7222 87.6024 89.7222 88.5417V90.9028ZM89.7222 62.5695C89.7222 63.5088 89.3491 64.4096 88.6849 65.0738C88.0207 65.738 87.1199 66.1111 86.1805 66.1111H41.3194C40.3801 66.1111 39.4793 65.738 38.8151 65.0738C38.1509 64.4096 37.7778 63.5088 37.7778 62.5695V60.2083C37.7778 59.269 38.1509 58.3682 38.8151 57.704C39.4793 57.0398 40.3801 56.6667 41.3194 56.6667H86.1805C87.1199 56.6667 88.0207 57.0398 88.6849 57.704C89.3491 58.3682 89.7222 59.269 89.7222 60.2083V62.5695ZM151.111 90.9028C151.111 91.8421 150.738 92.7429 150.074 93.4071C149.41 94.0713 148.509 94.4445 147.569 94.4445H102.708C101.769 94.4445 100.868 94.0713 100.204 93.4071C99.5398 92.7429 99.1667 91.8421 99.1667 90.9028V88.5417C99.1667 87.6024 99.5398 86.7015 100.204 86.0373C100.868 85.3731 101.769 85 102.708 85H147.569C148.509 85 149.41 85.3731 150.074 86.0373C150.738 86.7015 151.111 87.6024 151.111 88.5417V90.9028ZM151.111 62.5695C151.111 63.5088 150.738 64.4096 150.074 65.0738C149.41 65.738 148.509 66.1111 147.569 66.1111H102.708C101.769 66.1111 100.868 65.738 100.204 65.0738C99.5398 64.4096 99.1667 63.5088 99.1667 62.5695V60.2083C99.1667 59.269 99.5398 58.3682 100.204 57.704C100.868 57.0398 101.769 56.6667 102.708 56.6667H147.569C148.509 56.6667 149.41 57.0398 150.074 57.704C150.738 58.3682 151.111 59.269 151.111 60.2083V62.5695ZM151.111 34.2361C151.111 35.1754 150.738 36.0763 150.074 36.7405C149.41 37.4046 148.509 37.7778 147.569 37.7778H41.3194C40.3801 37.7778 39.4793 37.4046 38.8151 36.7405C38.1509 36.0763 37.7778 35.1754 37.7778 34.2361V22.4306C37.7778 21.4912 38.1509 20.5904 38.8151 19.9262C39.4793 19.262 40.3801 18.8889 41.3194 18.8889H147.569C148.509 18.8889 149.41 19.262 150.074 19.9262C150.738 20.5904 151.111 21.4912 151.111 22.4306V34.2361Z"
      fill={color}
    />
    <path
      d="M86.1806 85H41.3194C40.3801 85 39.4793 85.3732 38.8151 86.0373C38.1509 86.7015 37.7778 87.6024 37.7778 88.5417V90.9028C37.7778 91.8421 38.1509 92.7429 38.8151 93.4071C39.4793 94.0713 40.3801 94.4445 41.3194 94.4445H86.1806C87.1199 94.4445 88.0207 94.0713 88.6849 93.4071C89.3491 92.7429 89.7222 91.8421 89.7222 90.9028V88.5417C89.7222 87.6024 89.3491 86.7015 88.6849 86.0373C88.0207 85.3732 87.1199 85 86.1806 85ZM86.1806 56.6667H41.3194C40.3801 56.6667 39.4793 57.0398 38.8151 57.704C38.1509 58.3682 37.7778 59.269 37.7778 60.2083V62.5695C37.7778 63.5088 38.1509 64.4096 38.8151 65.0738C39.4793 65.738 40.3801 66.1111 41.3194 66.1111H86.1806C87.1199 66.1111 88.0207 65.738 88.6849 65.0738C89.3491 64.4096 89.7222 63.5088 89.7222 62.5695V60.2083C89.7222 59.269 89.3491 58.3682 88.6849 57.704C88.0207 57.0398 87.1199 56.6667 86.1806 56.6667ZM147.569 85H102.708C101.769 85 100.868 85.3732 100.204 86.0373C99.5398 86.7015 99.1667 87.6024 99.1667 88.5417V90.9028C99.1667 91.8421 99.5398 92.7429 100.204 93.4071C100.868 94.0713 101.769 94.4445 102.708 94.4445H147.569C148.509 94.4445 149.41 94.0713 150.074 93.4071C150.738 92.7429 151.111 91.8421 151.111 90.9028V88.5417C151.111 87.6024 150.738 86.7015 150.074 86.0373C149.41 85.3732 148.509 85 147.569 85ZM147.569 56.6667H102.708C101.769 56.6667 100.868 57.0398 100.204 57.704C99.5398 58.3682 99.1667 59.269 99.1667 60.2083V62.5695C99.1667 63.5088 99.5398 64.4096 100.204 65.0738C100.868 65.738 101.769 66.1111 102.708 66.1111H147.569C148.509 66.1111 149.41 65.738 150.074 65.0738C150.738 64.4096 151.111 63.5088 151.111 62.5695V60.2083C151.111 59.269 150.738 58.3682 150.074 57.704C149.41 57.0398 148.509 56.6667 147.569 56.6667ZM0 18.8889V103.691C0 108.838 4.03455 113.189 9.17882 113.333C10.4413 113.369 11.698 113.151 12.8747 112.692C14.0514 112.233 15.1241 111.543 16.0294 110.663C16.9348 109.782 17.6543 108.729 18.1454 107.566C18.6366 106.402 18.8894 105.152 18.8889 103.889V9.44446H9.44444C6.93962 9.44446 4.53739 10.4395 2.76621 12.2107C0.995037 13.9818 0 16.3841 0 18.8889H0Z"
      fill={color}
    />
  </ResponsiveSVG>
);
export default function Bio({ isTransitionSlide, setSlideView }) {
  const handleMouseColor = useCursorColor();

  const ref = useRef();
  const isInViewport = useIntersectionObserver(ref, { threshold: 0.6 });

  useEffect(() => {
    if (isInViewport) {
      setSlideView('Bio');
    }
  }, [isInViewport, setSlideView]);

  return (
    <BioContainer
      ref={ref}
      isCenter
      isLarge={isTransitionSlide}
      backgroundColor={COLORS.pink}
      onMouseOver={() => handleMouseColor('white')}
      zIndex={2}>
      <Background
        background={COLORS.pink}
        colors={colorsBackground}
        numberOfWaves={1}
        isLarge={isTransitionSlide}
      />
      <BioContent paralaxRate={-0.2} isCenter>
        <BioTextContainer
          isColumn
          paralaxRate={-0.3}
          isRelative
          isHorizontalParalax>
          <Typography variant="text" size="lg" color="white" isBold>
            <ResponsiveIMG
              src={profile}
              alt="profile_pic"
              width="150"
              height="150"
            />{' '}
            Hi, I’m Fabien an enthusiast{' '}
            <TextColor color={COLORS.black}>JavaScript</TextColor> Developer.
          </Typography>
          <Typography variant="text" size="lg" color="white" isBold>
            I live in France, where I graduate from an{' '}
            <TextColor color={COLORS.black}>engineering</TextColor> school.
          </Typography>

          <Typography variant="text" size="lg" color="white" isBold>
            Today I’m mostly working with{' '}
            <TextColor color={COLORS.black}>React / GraphQL.</TextColor>{' '}
          </Typography>
          <Typography variant="text" size="lg" color="white" isBold>
            Love design, UX and quality code.
          </Typography>
        </BioTextContainer>
        <FeatureContainer
          paralaxRate={0.3}
          isRelative
          isColumn
          isHorizontalParalax>
          <TextWithIcon>
            <ArticleSVG color={COLORS.green} />
            <Typography variant="text" size="lg" color="white" isBold>
              Sometimes,{' '}
              <Link
                alt="post"
                href="/post"
                color={COLORS.green}
                onMouseOver={() => handleMouseColor('green')}>
                I wrote
              </Link>{' '}
              about myself, javaScript and others things.
            </Typography>
          </TextWithIcon>
          <TextWithIcon isReverse>
            <PhotoSVG color={COLORS.yellow} />
            <Typography variant="text" size="lg" color="white" isBold>
              You may also find my latest{' '}
              <Link
                alt="projects"
                href="/projects"
                color={COLORS.yellow}
                onMouseOver={() => handleMouseColor('yellow')}>
                projects.
              </Link>{' '}
            </Typography>
          </TextWithIcon>
        </FeatureContainer>
      </BioContent>
    </BioContainer>
  );
}

Bio.defaultProps = {
  setSlideView: null,
  isTransitionSlide: false,
};

Bio.propTypes = {
  setSlideView: PropTypes.func,
  isTransitionSlide: PropTypes.bool,
};
