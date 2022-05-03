import styled from '@emotion/styled';

export const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 72px;

  background-color: ${({ theme: { palette } }) => palette.background.bg};
`;

export const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Logo = styled.img``;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TagsInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
