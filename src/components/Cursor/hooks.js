import { useEffect, useCallback, useContext, useRef } from 'react';

import { MouseHoverContext, CursorColorContext } from './contexts';

export const useCursorBoundingMagnet = (
  isParentMagnet = true,
  magnetArea = 20,
) => {
  const { isHover, toggleIsHover, setMagnetBounding } = useContext(
    MouseHoverContext,
  );

  const ref = useRef();

  useEffect(() => {
    if (magnetArea <= 0 || !isParentMagnet) return;

    const node = ref.current;

    if (document && node && node.parentNode) {
      const element = document.createElement('div');
      element.style = `padding:${magnetArea}px;`;

      node.parentNode.appendChild(element);
      element.appendChild(node);
    }
  }, [ref, isParentMagnet, magnetArea]);

  useEffect(() => {
    let node = ref.current;
    const events = ['mouseenter', 'mouseleave'];

    if (node.parentNode) {
      node = node.parentNode;
    }

    if (node && toggleIsHover) {
      events.forEach(event => node.addEventListener(event, toggleIsHover));
    }

    return () => {
      events.forEach(event => node.removeEventListener(event, toggleIsHover));
    };
  }, [ref, toggleIsHover]);

  useEffect(() => {
    const node = ref.current;

    if (node && isHover) {
      setMagnetBounding(ref.current.getBoundingClientRect());
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
