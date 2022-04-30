import styled from '@emotion/styled';

export const StyledGeneralTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px;
  min-width: ${({ theme: { breakpoints } }) => breakpoints.md}px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
`;

export const Content = styled.main`
  width: 100%;
`;
