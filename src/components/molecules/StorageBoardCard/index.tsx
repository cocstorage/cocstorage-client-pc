import React, { memo, HTMLAttributes } from 'react';
import { useTheme, Avatar, Typography, Icon } from 'cocstorage-ui';

import { StorageBoard } from '@dto/storage-boards';

import {
  StyledStorageBoardCard,
  ThumbnailWrapper,
  ThumbnailInner,
  Thumbnail,
  Content,
  Storage,
  Subject,
  Info,
  InfoLabel
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'emphasize' | 'normal' | 'compact';
  storageBoard?: StorageBoard;
}

function StorageBoardCard({ variant = 'compact', 완storageBoard }: StorageBoardCardProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();

  if (variant === 'emphasize') {
    return (
      <StyledStorageBoardCard variant={variant}>
        <ThumbnailWrapper theme={theme} variant={variant}>
          <ThumbnailInner>
            <Thumbnail
              width={246}
              src="https://static.cocstorage.com/images/to5gi98b6qwkvg5lgymvsga4a0a8"
              alt="Thumbnail Img"
            />
          </ThumbnailInner>
        </ThumbnailWrapper>
        <Content>
          <Storage>
            <Avatar
              round
              width="14px"
              height="14px"
              src="https://static.cocstorage.com/images/ayd9pw1masrhap51qhkzulhtprz4"
              alt="Storage Img"
            />
            <Typography fontSize="10px" lineHeight="13px" color={palette.text[type].text1}>
              리그 오브 레전드
            </Typography>
          </Storage>
          <Subject>
            <Typography component="div" lineHeight="18px" noWrap lineClamp={2}>
              로아 북미섭 검열때문에 오픈전부터 망하는중 ㅋㅋㅋㅋㅋㅋㅋ
            </Typography>
          </Subject>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
          </Info>
        </Content>
      </StyledStorageBoardCard>
    );
  }

  if (variant === 'normal') {
    return (
      <StyledStorageBoardCard variant={variant}>
        <ThumbnailWrapper theme={theme} variant={variant}>
          <ThumbnailInner>
            <Thumbnail
              width={82}
              src="https://static.cocstorage.com/images/to5gi98b6qwkvg5lgymvsga4a0a8"
              alt="Thumbnail Img"
            />
          </ThumbnailInner>
        </ThumbnailWrapper>
        <Content>
          <Subject>
            <Typography component="div" lineHeight="18px" noWrap lineClamp={2}>
              로아 북미섭 검열때문에 오픈전부터 망하는중 ㅋㅋㅋㅋㅋㅋㅋ
            </Typography>
          </Subject>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography fontSize="10px" lineHeight="13px">
                12
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Avatar
                round
                width="14px"
                height="14px"
                src="https://static.cocstorage.com/images/ayd9pw1masrhap51qhkzulhtprz4"
                alt="Storage Img"
              />
              <Typography fontSize="10px" lineHeight="13px" color={palette.text[type].text1}>
                리그 오브 레전드
              </Typography>
            </InfoLabel>
          </Info>
        </Content>
      </StyledStorageBoardCard>
    );
  }

  return (
    <StyledStorageBoardCard variant={variant}>
      <Content>
        <Subject>
          <Typography component="div" lineHeight="18px" noWrap lineClamp={1}>
            로아 북미섭 검열때문에 오픈전부터 망하는중 ㅋㅋㅋㅋㅋㅋㅋ
          </Typography>
        </Subject>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography fontSize="10px" lineHeight="13px">
              12
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography fontSize="10px" lineHeight="13px">
              12
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="ThumbsUpOutlined" width={14} height={14} />
            <Typography fontSize="10px" lineHeight="13px">
              12
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Avatar
              round
              width="14px"
              height="14px"
              src="https://static.cocstorage.com/images/ayd9pw1masrhap51qhkzulhtprz4"
              alt="Storage Img"
            />
            <Typography fontSize="10px" lineHeight="13px" color={palette.text[type].text1} noWrap>
              리그 오브 레전드
            </Typography>
          </InfoLabel>
        </Info>
      </Content>
      <ThumbnailWrapper theme={theme} variant={variant}>
        <ThumbnailInner>
          <Thumbnail
            width={61}
            src="https://static.cocstorage.com/images/to5gi98b6qwkvg5lgymvsga4a0a8"
            alt="Thumbnail Img"
          />
        </ThumbnailInner>
      </ThumbnailWrapper>
    </StyledStorageBoardCard>
  );
}

export default memo(StorageBoardCard);
