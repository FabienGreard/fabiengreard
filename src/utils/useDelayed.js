import { useState, useEffect, useRef } from 'react';

const perf = typeof performance !== 'undefined' ? performance : Date;
const now = () => perf.now();

export const useThrottle = (value, fps) => {
  const [throttledValue, setThrottledValue] = useState(() => value);
  const timer = useRef(now());

  const delay = (fps = 1000 / fps);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (now() - timer.current >= delay) {
        setThrottledValue(value);
        timer.current = now();
      }
    }, delay - (now() - timer.current));
    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
