import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialMouseHover = false;

export const MouseHoverContext = React.createContext(initialMouseHover);

export const MouseHoverProvider = ({
  initialContext = initialMouseHover,
  children,
}) => {
  const [isHover, setIsHover] = useState(initialContext);
  const [magnetBounding, setMagnetBounding] = useState(null);

  const toggleIsHover = () => setIsHover(!isHover);

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
        setIsHover,
        toggleIsHover,
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
