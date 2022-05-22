import styled from '@emotion/styled';

export const List = styled.ul``;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
`;

export const ListItemGroup = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-top: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
`;
