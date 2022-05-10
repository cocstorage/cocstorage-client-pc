import { PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';

import { useTheme } from 'cocstorage-ui';

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

export const StyledGeneralTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px;
  min-width: ${({ theme: { breakpoints } }) => breakpoints.md}px;
  margin: 0 auto;
  padding: 0 20px 20px;
  height: 100%;
`;

export const Content = styled.main`
  width: 100%;
`;

export default GeneralTemplate;
