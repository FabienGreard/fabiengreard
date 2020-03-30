import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const container = styled.div`
  display: flex;

  ${props =>
    props.isColumn &&
    css`
      flex-direction: column;
    `}

    ${props =>
      (props.isCenter || props.isHorizontalCenter) &&
      (props.isColumn
        ? css`
            align-items: center;
          `
        : css`
            justify-content: center;
          `)}

    ${props =>
      (props.isCenter || props.isVerticalCenter) &&
      (props.isColumn
        ? css`
            justify-content: center;
          `
        : css`
            align-items: center;
          `)}
`;

const Layout = styled(container)`
  background-color: ${props => props.theme.colors.darkBackground};
  width: 100vw;
  height: 100vh;
`;

export default Layout;

container.defaultProps = {
  isColumn: false,
  isCenter: false,
  isHorizontalCenter: false,
  isVerticalCenter: false,
};

container.propTypes = {
  isColumn: PropTypes.bool,
  isCenter: PropTypes.bool,
  isHorizontalCenter: PropTypes.bool,
  isVerticalCenter: PropTypes.bool,
};

Layout.defaultProps = {
  ...container.defaultProps,
};

Layout.propTypes = {
  ...container.propTypes,
};
