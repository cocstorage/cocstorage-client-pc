import styled, { CSSObject } from '@emotion/styled';

import { StorageBoardCardProps } from './index';

export const StyledStorageBoardCard = styled.button<
  Pick<StorageBoardCardProps, 'variant'> & {
    hasThumbnail: boolean;
  }
>`
  display: grid;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ variant, hasThumbnail }): CSSObject => {
    switch (variant) {
      case 'emphasize':
        return {
          gridTemplateColumns: '183px 1fr',
          columnGap: 14
        };
      case 'normal':
        return {
          gridTemplateColumns: '82px 1fr',
          columnGap: 14,
          minHeight: 60
        };
      default:
        return {
          gridTemplateColumns: !hasThumbnail ? '1fr auto' : '1fr 61px'
        };
    }
  }}

  ${({ hasThumbnail }): CSSObject =>
    hasThumbnail
      ? {
          columnGap: 14
        }
      : {}}
`;

export const Storage = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 14px 1fr;
  gap: 4px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoLabel = styled.span`
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1px;

  & > *:after {
    display: inline-block;
    content: '';
    width: 2px;
    height: 2px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: ${({ theme: { type, palette } }) => palette.text[type].text1};
  }
  & > *:last-child:after {
    display: none;
  }
`;
