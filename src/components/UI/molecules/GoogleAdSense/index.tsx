import { useEffect, useState } from 'react';

import { StyledGoogleAdSense } from './GoogleAdSense.styles';

interface GoogleAdSenseProps {
  html: string;
}

function GoogleAdSense({ html }: GoogleAdSenseProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <StyledGoogleAdSense dangerouslySetInnerHTML={{ __html: html }} />;
}

export default GoogleAdSense;
