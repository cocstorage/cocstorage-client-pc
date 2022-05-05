import styled, { CSSObject } from '@emotion/styled';

import { StorageBoardCardProps } from './index';

export const StyledStorageBoardCard = styled.div<
  Pick<StorageBoardCardProps, 'variant'> & {
    hasThumbnail: boolean;
  }
>`
  display: grid;
  cursor: pointer;

  ${({ variant, hasThumbnail }): CSSObject => {
    switch (variant) {
      case 'emphasize':
        return {
          gridTemplateColumns: !hasThumbnail ? 'auto 1fr' : '183px 1fr'
        };
      case 'normal':
        return {
          gridTemplateColumns: !hasThumbnail ? 'auto 1fr' : '82px 1fr',
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

export const ThumbnailWrapper = styled.div<Pick<StorageBoardCardProps, 'variant'>>`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;

  background-color: ${({ theme: { palette } }) => palette.background.fg1};

  ${({ variant }): CSSObject => {
    switch (variant) {
      case 'emphasize':
        return {
          borderRadius: 12
        };
      case 'normal':
        return {
          borderRadius: 6
        };
      default:
        return {
          borderRadius: 8
        };
    }
  }};
`;

export const ThumbnailInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;

export const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
`;

export const Storage = styled.div`
  display: flex;
  align-items: center;
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
