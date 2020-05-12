import { useState, useEffect, useCallback } from 'react';

import useRequestAnimationFrame from './useRequestAnimationFrame';
import { useThrottle } from './useDelayed';

const useMouseCoords = (element = window) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const animate = useRequestAnimationFrame();

  const { x, y } = useThrottle(coords, 60);

  const handler = useCallback(
    ({ clientX: x, clientY: y }) => animate(() => setCoords({ x, y })),
    [animate],
  );

  useEffect(() => {
    element.addEventListener('mousemove', handler);

    return () => element.removeEventListener('mousemove', handler);
  }, [element, handler]);

  return { x, y };
};

export default useMouseCoords;
