import { useLayoutEffect, useCallback, useContext, useRef } from 'react';

import { MouseHoverContext, CursorColorContext } from './contexts';

export const useCursorBoundingMagnet = () => {
  const { isHover, setIsHover, setMagnetBounding } = useContext(MouseHoverContext);

  const ref = useRef();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    const handleMouseEnter = () => {
      setIsHover(node.id);
    };

    const handleMouseLeave = () => setIsHover(false);

    const handleFunction = {
      mouseover: handleMouseEnter,
      mouseleave: handleMouseLeave,
    };

    if (!node) return;

    if (node && setIsHover) {
      Object.entries(handleFunction).forEach(([key, event]) => node.addEventListener(key, event));
    }

    return () => {
      if (!node) return;
      Object.entries(handleFunction).forEach(([key, event]) =>
        node.removeEventListener(key, event),
      );
    };
  }, [isHover, ref, setIsHover]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    if (node && node.id === isHover) {
      setMagnetBounding(node.getBoundingClientRect());
    }
  }, [ref, isHover, setMagnetBounding]);

  return ref;
};

export const useCursorColor = () => {
  const { setColor, color: colorContext } = useContext(CursorColorContext);

  return useCallback(color => color !== colorContext && setColor(color), [setColor, colorContext]);
};
