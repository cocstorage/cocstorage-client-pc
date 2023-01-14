import { PropsWithChildren, ReactElement } from 'react';

import { Flexbox } from 'cocstorage-ui';

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
    <Flexbox direction="vertical" customStyle={{ height: '100vh' }}>
      {header}
      <Flexbox
        direction="vertical"
        component="main"
        customStyle={{ flex: 1, overflow: enableMainOverflowHidden ? 'hidden' : undefined }}
      >
        {children}
      </Flexbox>
      {footer}
    </Flexbox>
  );
}

export default WideFlexibleTemplate;
