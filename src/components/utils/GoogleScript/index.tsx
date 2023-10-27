import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';

import Gtag from '@library/gtag';

function GoogleScript() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (process.env.NODE_ENV !== 'production') return;
      Gtag.pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-20GMQTM36F"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            'window.dataLayer = window.dataLayer || [];\n' +
            '  function gtag(){dataLayer.push(arguments);}\n' +
            '  gtag("js", new Date());\n' +
            '  gtag("config", "G-20GMQTM36F");'
        }}
      />
    </>
  );
}

export default GoogleScript;
