import { useCallback } from 'react';

const useSafeCallback = (callback, label = 'safeCallback') => {
  return useCallback(
    (...args) => {
      try {
        return callback(...args);
      } catch (error) {
        console.error(`[${label}] callback error`, error);
      }
    },
    [callback, label]
  );
};

export default useSafeCallback;
