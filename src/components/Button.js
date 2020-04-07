import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';

import { MouseHoverContext } from './Cursor';

const ButtonStyle = styled.button`
  width: 150px;
  height: 50px;
  cursor: none;
`;

const Button = () => {
  const { isHover, toggleIsHover, setMagnetBounding } = useContext(
    MouseHoverContext,
  );
  const ref = useRef();

  useEffect(() => {
    if (ref.current && isHover) {
      setMagnetBounding(ref.current.getBoundingClientRect());
    }
  }, [ref, isHover, setMagnetBounding]);
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 20,
      }}
      onMouseEnter={toggleIsHover}
      onMouseLeave={toggleIsHover}>
      <ButtonStyle ref={ref}>Click Me</ButtonStyle>
    </div>
  );
};

export default Button;
