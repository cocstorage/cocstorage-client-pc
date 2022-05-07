import styled from '@emotion/styled';

export const StyledIssueKeywordCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  & > * {
    cursor: pointer !important;
  }
`;

export const Keyword = styled.div`
  flex: 1;
  text-align: left;
`;
