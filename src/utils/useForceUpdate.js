import { useState, useEffect } from 'react';

const perf = typeof performance !== 'undefined' ? performance : Date;
const now = () => perf.now();

const useForceUpdate = ms => {
  const [timeStamp, update] = useState(now());

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (!ms || (typeof PRERENDER === 'boolean' && PRERENDER)) {
      return;
    }

    const interval = setInterval(() => update(now()), ms);

    return () => window.clearInterval(interval);
  }, [ms]);

  return [timeStamp, () => update(now())];
};

export default useForceUpdate;
