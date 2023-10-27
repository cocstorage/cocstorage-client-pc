import { RefObject, useEffect, useState } from 'react';

interface UseScrollTriggerProps<T> {
  trigger?: boolean;
  ref?: RefObject<T> | T;
}

export default function useScrollTrigger<T extends HTMLElement>({
  trigger = true,
  ref
}: UseScrollTriggerProps<T>): {
  triggered: boolean;
} {
  const [triggered, setTriggered] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref) return;

      let newTop = 0;

      if (ref instanceof HTMLElement) {
        const { top = 0 } = ref.getBoundingClientRect();

        newTop = top;
      } else {
        const { top = 0 } = ref.current?.getBoundingClientRect() || {};

        newTop = top;
      }

      const { scrollY } = window;
      const { scrollTop } = document.documentElement;

      const offsetTop = newTop + scrollY;

      if (offsetTop >= 0 && offsetTop < scrollTop && !triggered) {
        setTriggered(true);
        setFixedTop(offsetTop);
      } else if (scrollTop <= fixedTop && triggered) {
        setTriggered(false);
      }
    };

    if (trigger) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (trigger) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fixedTop, ref, trigger, triggered]);

  return {
    triggered
  };
}
