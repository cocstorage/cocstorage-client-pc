import { PropsWithChildren, ReactElement } from 'react';

import { Grid } from '@cocstorage/ui';
import styled from '@emotion/styled';

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
