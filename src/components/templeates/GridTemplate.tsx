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
          // TODO 추후 UI 라이브러리 반영
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Grid component="aside" item lgHidden customStyle={{ minWidth: 203 }}>
            {leftAside}
          </Grid>
        )}
        {/* customStyle width: 100% TODO 추후 UI 라이브러리 반영 */}
        <Grid component="section" item auto customStyle={{ width: '100%' }}>
          {children}
        </Grid>
        {rightAside && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
