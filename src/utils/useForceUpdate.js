import { useState, useEffect } from 'react';

const useForceUpdate = ms => {
  const [timeStamp, update] = useState(Date.now());

  useEffect(() => {
    if (!ms) {
      return;
    }

    const interval = setInterval(() => update(Date.now()), ms);

    return () => window.clearInterval(interval);
  }, [ms]);

  return [timeStamp, () => update(Date.now())];
};

export default useForceUpdate;
