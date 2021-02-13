import { useState, useEffect } from 'react';

const useIntersectionObserver = (ref, config = {}) => {
  const [isInviewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) return;

    const target = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        }

        if (!entry.isIntersecting) {
          setIsInViewport(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...config,
      },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [ref, config]);

  return isInviewport;
};

export default useIntersectionObserver;
