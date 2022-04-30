import React, { ReactElement, PropsWithChildren } from 'react';
import { useTheme } from 'cocstorage-ui';

import { StyledGeneralTemplate, Content } from './GeneralTemplate.styles';

export interface GeneralTemplateProps {
  header?: ReactElement;
  footer?: ReactElement;
}

function GeneralTemplate({ children, header, footer }: PropsWithChildren<GeneralTemplateProps>) {
  const { theme } = useTheme();

  return (
    <StyledGeneralTemplate theme={theme}>
      {header}
      <Content>{children}</Content>
      {footer}
    </StyledGeneralTemplate>
  );
}

export default GeneralTemplate;
