import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, LinearProgress } from 'cocstorage-ui';

function PageProgress() {
  const router = useRouter();
  const [value, setValue] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const progressingTimerRef = useRef<ReturnType<typeof setInterval>>();
  const progressingDoneTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleRouteChangeStart = () => {
    setIsDone(false);
    setValue(0);

    if (progressingTimerRef.current) {
      clearInterval(progressingTimerRef.current);
    }

    if (progressingDoneTimerRef.current) {
      clearTimeout(progressingDoneTimerRef.current);
    }

    progressingTimerRef.current = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue < 100) {
          const diff = Math.random() * 10;
          return Math.min(prevValue + diff, 100);
        }
        return 100;
      });
    }, 500);
  };

  const handleRouteChangeComplete = () => {
    if (progressingTimerRef.current) {
      clearInterval(progressingTimerRef.current);
    }

    setValue(100);

    progressingDoneTimerRef.current = setTimeout(() => setIsDone(true), 300);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    return () => {
      if (progressingTimerRef.current) {
        clearInterval(progressingTimerRef.current);
      }

      if (progressingDoneTimerRef.current) {
        clearTimeout(progressingDoneTimerRef.current);
      }
    };
  }, []);

  return (
    <Box
      customStyle={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        opacity: !value || isDone ? 0 : 1,
        transition: 'opacity .5s cubic-bezier(0, 0, 0.2, 1) 0ms',
        zIndex: 10
      }}
    >
      <LinearProgress value={value} />
    </Box>
  );
}

export default PageProgress;
