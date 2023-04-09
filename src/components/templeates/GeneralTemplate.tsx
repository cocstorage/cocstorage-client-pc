import { PropsWithChildren, ReactElement } from 'react';

import localFont from 'next/font/local';

import styled from '@emotion/styled';

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

interface GeneralTemplateProps {
  header?: ReactElement;
  footer?: ReactElement;
}

function GeneralTemplate({ children, header, footer }: PropsWithChildren<GeneralTemplateProps>) {
  return (
    <StyledGeneralTemplate className={font.className}>
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
