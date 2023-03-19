import { PropsWithChildren, ReactElement } from 'react';

import localFont from 'next/font/local';

import styled from '@emotion/styled';

import { Grid } from 'cocstorage-ui';

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

interface GridTemplateProps {
  header?: ReactElement;
  leftAside?: ReactElement;
  rightAside?: ReactElement;
  footer?: ReactElement;
}

function GridTemplate({
  children,
  header,
  leftAside,
  rightAside,
  footer
}: PropsWithChildren<GridTemplateProps>) {
  return (
    <StyledGridTemplate className={font.className}>
      {header}
      <Grid component="main" container columnGap={80}>
        {leftAside && (
          <Grid component="aside" item lgHidden>
            {leftAside}
          </Grid>
        )}
        <Grid component="section" item auto customStyle={{ width: '100%', overflow: 'hidden' }}>
          {children}
        </Grid>
        {rightAside && (
          <Grid component="aside" item>
            {rightAside}
          </Grid>
        )}
      </Grid>
      {footer}
    </StyledGridTemplate>
  );
}

export const StyledGridTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px;
  min-width: ${({ theme: { breakpoints } }) => breakpoints.md}px;
  margin: 0 auto;
  width: calc(100% - 40px);
  padding: 0 20px 20px;
  height: 100%;
`;

export default GridTemplate;
