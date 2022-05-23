import { RefObject, useCallback, useEffect, useState } from 'react';

interface UseScrollTriggerProps<T> {
  trigger?: boolean;
  ref?: RefObject<T>;
}

export default function useScrollTrigger<T extends HTMLElement>({
  trigger = true,
  ref
}: UseScrollTriggerProps<T>): {
  scrollFixed: boolean;
} {
  const [scrollFixed, setScrollFixed] = useState<boolean>(false);
  const [fixedTop, setFixedTop] = useState<number>(0);

  const handleScroll = useCallback(() => {
    if (!ref || !ref.current) return;

    const { top = 0 } = ref.current?.getBoundingClientRect() || {};
    const { scrollY } = window;
    const { scrollTop } = document.documentElement;

    const offsetTop = top + scrollY;

    if (offsetTop >= 0 && offsetTop < scrollTop && !scrollFixed) {
      setScrollFixed(true);
      setFixedTop(offsetTop);
    } else if (scrollTop <= fixedTop && scrollFixed) {
      setScrollFixed(false);
    }
  }, [scrollFixed, fixedTop, ref]);

  useEffect(() => {
    if (trigger) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (trigger) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [trigger, handleScroll]);

  useEffect(() => {
    if (trigger) {
      window.addEventListener('load', handleScroll);
    }

    return () => {
      if (trigger) {
        window.removeEventListener('load', handleScroll);
      }
    };
  }, [trigger, handleScroll]);

  useEffect(() => handleScroll(), [handleScroll]);

  return {
    scrollFixed
  };
}
