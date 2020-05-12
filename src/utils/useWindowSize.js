import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
  const getSize = () => ({
    width: window.outerWidth,
    height: window.outerHeight,
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
