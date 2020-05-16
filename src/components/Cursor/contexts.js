import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialMouseHover = false;

export const MouseHoverContext = React.createContext(initialMouseHover);

export const MouseHoverProvider = ({
  initialContext = initialMouseHover,
  children,
}) => {
  const [isHover, setIsHover] = useState(initialContext);
  const [isBlockedHover, setIsBlockedHover] = useState(false);
  const [magnetBounding, setMagnetBounding] = useState(null);

  useEffect(() => {
    if (!isHover) {
      setMagnetBounding(false);
    }
  }, [isHover]);

  const { x, y, width, height } = magnetBounding || {};

  return (
    <MouseHoverContext.Provider
      value={{
        isHover,
        setIsBlockedHover,
        setIsHover: isHover => {
          setIsHover(isBlockedHover ? false : isHover);
        },
        isMagnet: !!magnetBounding,
        magnetCoords: magnetBounding ? [x + width / 2, y + height / 2] : [],
        magnetSize: [width, height],
        setMagnetBounding,
      }}>
      {children}
    </MouseHoverContext.Provider>
  );
};

MouseHoverProvider.defaultProps = {
  children: null,
  initialContext: initialMouseHover,
};

MouseHoverProvider.propTypes = {
  initialContext: PropTypes.bool,
  children: PropTypes.node,
};

const initialCursorColor = 'black';

export const CursorColorContext = React.createContext(initialCursorColor);

export const CursorColorProvider = ({
  initialContext = initialCursorColor,
  children,
}) => {
  const [color, setColor] = useState(initialContext);

  return (
    <CursorColorContext.Provider
      value={{
        color,
        setColor,
      }}>
      {children}
    </CursorColorContext.Provider>
  );
};

CursorColorProvider.defaultProps = {
  children: null,
  initialContext: initialCursorColor,
};

CursorColorProvider.propTypes = {
  initialContext: PropTypes.string,
  children: PropTypes.node,
};
