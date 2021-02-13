import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
  const getSize = () => ({
    width: Math.min(window.outerWidth, window.innerWidth),
    height: Math.min(window.outerHeight, window.innerHeight),
  });

  const [size, setSize] = useState(getSize);

  useLayoutEffect(() => {
    const handleResize = () => setSize(getSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useWindowSize;
