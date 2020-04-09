import React from 'react';
import styled from 'styled-components';

import { useCursorBoundingMagnet } from './Cursor';

const ButtonStyle = styled.button`
  width: 150px;
  height: 50px;
  cursor: none;
`;

const Button = () => {
  const ref = useCursorBoundingMagnet();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <ButtonStyle ref={ref}>Click Me</ButtonStyle>
    </div>
  );
};

export default Button;
