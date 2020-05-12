import { useState, useEffect } from 'react';

const useMouseCoords = (element = window) => {
  const [{ x, y }, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = ({ clientX: x, clientY: y }) => setCoords({ x, y });

    element.addEventListener('mousemove', handler);

    return () => element.removeEventListener('mousemove', handler);
  }, [element]);

  return { x, y };
};

export default useMouseCoords;
