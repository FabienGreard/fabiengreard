import { useState, useLayoutEffect } from 'react';

import { DEVICES } from './theme';
import useWindowSize from './useWindowSize';

const sizes = Object.values(DEVICES);

const useMedia = (initial = 1440) => {
  const [media, setMedia] = useState(initial);
  const { width } = useWindowSize();

  const closestNumber = number =>
    sizes.reduce((a, b) => (Math.abs(number - a) < Math.abs(number - b) ? a : b));

  useLayoutEffect(() => {
    setMedia(closestNumber(width));
  }, [width]);

  return media;
};

export default useMedia;
