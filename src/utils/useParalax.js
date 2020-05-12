import { useState, useCallback, useLayoutEffect } from 'react';

const useParalax = (ref = null) => {
  const [scrollPos, setScrollPos] = useState([0, 0]);

  const onScroll = useCallback(
    e => {
      let offset = 0;

      if (ref && ref.current) {
        const { y, height } = ref.current.getBoundingClientRect();

        offset = Math.max(ref.current.offsetParent.offsetTop, y + height);
      }

      setScrollPos([
        e.currentTarget.pageXOffset,
        Math.abs(offset - e.currentTarget.pageYOffset),
      ]);
    },
    [setScrollPos, ref],
  );

  useLayoutEffect(() => {
    if (window) {
      window.addEventListener('scroll', onScroll);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return scrollPos;
};

export default useParalax;
