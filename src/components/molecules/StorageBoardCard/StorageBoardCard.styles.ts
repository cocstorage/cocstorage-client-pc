import styled, { CSSObject } from '@emotion/styled';

import { StorageBoardCardProps } from '.';

export const StyledStorageBoardCard = styled.div<Pick<StorageBoardCardProps, 'variant'>>`
  display: grid;
  column-gap: 14px;
  cursor: pointer;

  ${({ variant }): CSSObject => {
    switch (variant) {
      case 'emphasize':
        return {
          gridTemplateColumns: '183px 1fr'
        };
      case 'normal':
        return {
          gridTemplateColumns: '82px 1fr',
          minHeight: 60
        };
      default:
        return {
          gridTemplateColumns: '1fr 61px'
        };
    }
  }}
`;

export const ThumbnailWrapper = styled.div<Pick<StorageBoardCardProps, 'variant'>>`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;

  background-color: ${({ theme: { palette } }) => palette.background.fg2};

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

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Storage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

export const Subject = styled.div`
  flex-grow: 1;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const InfoLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 2.5px;
`;
