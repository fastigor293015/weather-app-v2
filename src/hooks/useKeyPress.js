import { useEffect } from 'react';

export function useKeyPress(keyOrKeys, action, shouldWork = true) {
  useEffect(() => {
    const onKeyPress = (event) => {
      if (!shouldWork) return;
      if (typeof keyOrKeys === 'string') {
        if (event.key === keyOrKeys) action();
      } else if (typeof keyOrKeys === 'object') {
        const actionToPerform = keyOrKeys[event.key];
        if (actionToPerform) actionToPerform();
      }
    };
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [keyOrKeys, action, shouldWork]);
}
