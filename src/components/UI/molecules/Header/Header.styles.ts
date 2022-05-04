import styled, { CSSObject } from '@emotion/styled';

import { HeaderProps } from '.';

export const StyledHeader = styled.header<Pick<HeaderProps, 'fixed'>>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 72px;
  border-bottom: 1px solid transparent;

  background-color: ${({ theme: { palette } }) => palette.background.bg};

  ${({ theme: { palette }, fixed }): CSSObject =>
    fixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1,
          animation: 'slideDown .5s forwards',
          borderColor: palette.box.stroked.normal
        }
      : {}}

  @keyframes slideDown {
    from {
      transform: translateY(-73px);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme: { breakpoints } }) => `calc(${breakpoints.xl}px - 40px)`};
  gap: 8px;
`;

export const Logo = styled.img``;
