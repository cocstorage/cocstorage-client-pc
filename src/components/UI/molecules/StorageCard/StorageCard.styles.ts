import styled from '@emotion/styled';

export const StyledStorageCard = styled.button`
  display: grid;
  align-items: center;
  gap: 8px;
  height: 36px;
  cursor: pointer;
  text-align: left;

  grid-template-columns: 36px 1fr;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: 6px;
  overflow: hidden;

  background-color: ${({ theme: { palette } }) => palette.background.fg1};
`;

export const AvatarInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;
