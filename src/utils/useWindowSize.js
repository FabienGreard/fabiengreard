import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({});

  const getSize = () =>
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  useEffect(() => {
    const handleResize = getSize;

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useWindowSize;
