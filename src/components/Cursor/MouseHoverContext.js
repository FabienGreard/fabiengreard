import React, { useState } from 'react';

const initialMouseHover = false;

export const MouseHoverContext = React.createContext(initialMouseHover);

export const MouseHoverProvider = ({
  initialContext = initialMouseHover,
  children,
}) => {
  const [isHover, setIsHover] = useState(initialContext);

  const toggleIsHover = () => setIsHover(!isHover);

  return (
    <MouseHoverContext.Provider value={{ isHover, setIsHover, toggleIsHover }}>
      {children}
    </MouseHoverContext.Provider>
  );
};
