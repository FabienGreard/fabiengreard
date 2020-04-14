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

  return <ButtonStyle ref={ref}>Click Me</ButtonStyle>;
};

export default Button;
