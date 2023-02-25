import { PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Grid } from 'cocstorage-ui';

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
    <StyledGridTemplate>
      {header}
      <Grid component="main" container columnGap={20}>
        {leftAside && (
          <Grid component="aside" item lgHidden customStyle={{ minWidth: 203 }}>
            {leftAside}
          </Grid>
        )}
        <Grid component="section" item auto customStyle={{ width: '100%', overflow: 'hidden' }}>
          {children}
        </Grid>
        {rightAside && (
          <Grid component="aside" item customStyle={{ minWidth: 203 }}>
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
  gap: 20px;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px;
  min-width: ${({ theme: { breakpoints } }) => breakpoints.md}px;
  margin: 0 auto;
  padding: 0 20px 20px;
  height: 100%;
`;

export default GridTemplate;
