import { PropsWithChildren, ReactElement } from 'react';

import { Box, Flexbox, Hidden } from '@cocstorage/ui';
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
      {/* TODO UI 라이브러리 Grid 컴포넌트 개선 후 교체 */}
      <Flexbox
        gap={80}
        customStyle={{
          width: '100%'
        }}
      >
        <Hidden component="aside" lgHidden>
          {leftAside}
        </Hidden>
        <Box
          component="main"
          customStyle={{
            flex: 1
          }}
        >
          {children}
        </Box>
        <Box component="aside">{rightAside}</Box>
      </Flexbox>
      {footer}
    </StyledGridTemplate>
  );
}

export const StyledGridTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: 100%;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px;
  min-width: ${({ theme: { breakpoints } }) => breakpoints.md}px;
  margin: 0 auto;
  padding: 0 20px 20px;
`;

export default GridTemplate;
