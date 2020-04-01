import { useState, useEffect, useRef } from 'react';

export const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const timer = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - timer.current >= delay) {
        setThrottledValue(value);
        timer.current = Date.now();
      }
    }, delay - (Date.now() - timer.current));
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
