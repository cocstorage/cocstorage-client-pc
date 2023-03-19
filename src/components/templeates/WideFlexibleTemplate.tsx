import { PropsWithChildren, ReactElement } from 'react';

import localFont from 'next/font/local';

import { Flexbox } from 'cocstorage-ui';

const font = localFont({
  src: [
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '900' },
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '700' },
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '500' },
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '400' },
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '300' },
    { path: '../../styles/fonts/MinSansVF.woff2', weight: '100' }
  ]
});

interface WideFlexibleTemplateProps {
  header?: ReactElement;
  footer?: ReactElement;
  enableMainOverflowHidden?: boolean;
}

function WideFlexibleTemplate({
  children,
  header,
  footer,
  enableMainOverflowHidden
}: PropsWithChildren<WideFlexibleTemplateProps>) {
  return (
    <Flexbox className={font.className} direction="vertical" customStyle={{ height: '100vh' }}>
      {header}
      <Flexbox
        component="main"
        direction="vertical"
        customStyle={{ flex: 1, overflow: enableMainOverflowHidden ? 'hidden' : undefined }}
      >
        {children}
      </Flexbox>
      {footer}
    </Flexbox>
  );
}

export default WideFlexibleTemplate;
