import { useEffect, useState } from 'react';

const useScroll = (threshold = 40) => {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > threshold);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);
  
    return scrolled;
  };
  
  export default useScroll;