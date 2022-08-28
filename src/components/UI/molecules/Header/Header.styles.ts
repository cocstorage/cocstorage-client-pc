import styled, { CSSObject } from '@emotion/styled';

export const StyledHeader = styled.header<{
  triggered?: boolean;
}>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid transparent;

  background-color: ${({ theme: { palette } }) => palette.background.bg};

  ${({ theme: { palette }, triggered }): CSSObject =>
    triggered
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          borderColor: palette.box.stroked.normal,
          zIndex: 1,
          animation: 'slideDown .2s forwards'
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

export const HeaderInner = styled.div<{
  triggered?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme: { breakpoints } }) => `${breakpoints.xl}px`};
  gap: 8px;

  ${({ triggered }): CSSObject =>
    triggered
      ? {
          padding: '0 20px'
        }
      : {}};
`;

export const Logo = styled.img``;
