import { useEffect } from 'react';

import { Box, CustomStyle } from 'cocstorage-ui';

import { StyledGoogleAdSense } from './GoogleAdSense.styles';

interface GoogleAdSenseProps {
  html: string;
  customStyle?: CustomStyle;
}

function GoogleAdSense({ html, customStyle }: GoogleAdSenseProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  // eslint-disable-next-line react/no-danger
  return (
    <Box css={customStyle}>
      <StyledGoogleAdSense dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
}

export default GoogleAdSense;
