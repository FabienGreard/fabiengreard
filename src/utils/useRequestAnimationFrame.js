import { useState, useRef, useEffect } from 'react';

const useRequestAnimationFrame = () => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const [callback, setCallback] = useState(null);

  useEffect(() => {
    const animate = delay => {
      if (previousTimeRef.current !== undefined) {
        if (callback) callback();
      }
      previousTimeRef.current = delay;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);

  return setCallback;
};

export default useRequestAnimationFrame;
