import { useEffect, useCallback } from 'react';

const useScroll = (callback) => {
  const handleScroll = useCallback(() => {
    callback(window.scrollY);
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export default useScroll;