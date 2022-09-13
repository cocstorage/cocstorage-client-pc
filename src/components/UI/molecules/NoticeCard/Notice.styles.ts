import styled from '@emotion/styled';

export const StyledNoticeCard = styled.div`
  & a:visited .subject {
    color: ${({
      theme: {
        palette: { others }
      }
    }) => others.visited};
  }
`;

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  grid-template-columns: 82px 1fr;
  min-height: 60px;
  column-gap: 14px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 2.5px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].text1};
`;
