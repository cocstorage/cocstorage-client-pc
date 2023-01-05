import { PropsWithChildren, ReactElement } from 'react';

import { Box, Flexbox } from 'cocstorage-ui';

interface WideFlexibleTemplateProps {
  header?: ReactElement;
  footer?: ReactElement;
}

function WideFlexibleTemplate({
  children,
  header,
  footer
}: PropsWithChildren<WideFlexibleTemplateProps>) {
  return (
    <Flexbox direction="vertical" customStyle={{ height: '100vh' }}>
      {header}
      <Box component="main" customStyle={{ flex: 1 }}>
        {children}
      </Box>
      {footer}
    </Flexbox>
  );
}

export default WideFlexibleTemplate;
