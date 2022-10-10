import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { commonHistoryState } from '@recoil/common/atoms';

import getAsPath from '@utils/getAsPath';

const serverSidePages = [
  '/',
  '/notices',
  '/notices/[id]',
  '/storages',
  '/storages/[path]',
  '/storages/[path]/[id]',
  '/best',
  '/worst'
];

function HistoryProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [history, setHistoryState] = useRecoilState(commonHistoryState);

  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const pathname = getAsPath(url);

      if (isReturning) {
        setHistoryState({
          index: history.index - 1,
          object: history.object.filter((arr, index) => index < history.object.length - 1)
        });
      } else {
        setHistoryState({
          index: history.index + 1,
          object: [...history.object, pathname]
        });
      }
    };

    const handleRouteChangeComplete = () => {
      if (isReturning) {
        setIsReturning(false);
      }
    };

    router.beforePopState(() => {
      setIsReturning(true);
      if (serverSidePages.indexOf(history.object[history.index - 1]) > -1)
        document.cookie = 'isReturning=true;path=/';

      return true;
    });

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [setHistoryState, history, isReturning, router]);

  return children as ReactElement;
}

export default HistoryProvider;
