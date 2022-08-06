import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & > span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
