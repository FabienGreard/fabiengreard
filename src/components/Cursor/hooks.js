import { useEffect, useCallback, useContext, useRef } from 'react';

import { MouseHoverContext, CursorColorContext } from './contexts';

export const useCursorBoundingMagnet = () => {
  const { isHover, setIsHover, setMagnetBounding } = useContext(
    MouseHoverContext,
  );

  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;
    const events = ['mouseenter', 'mouseleave'];

    const handleMouseEnter = e => {
      setIsHover(e.target.id);
    };

    const handleMouseLeave = () => setIsHover(false);

    const handleFunction = {
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave,
    };

    if (!node) return;

    if (node && setIsHover) {
      events.forEach(event =>
        node.addEventListener(event, handleFunction[event]),
      );
    }

    return () => {
      if (!node) return;
      events.forEach(event =>
        node.removeEventListener(event, handleFunction[event]),
      );
    };
  }, [ref, setIsHover]);

  useEffect(() => {
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

  return useCallback(color => color !== colorContext && setColor(color), [
    setColor,
    colorContext,
  ]);
};
