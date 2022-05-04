import React, { useState, useCallback, useMemo, memo, HTMLAttributes } from 'react';
import dayjs from 'dayjs';

import { useTheme, Avatar, Typography, Icon, Flexbox, Badge } from 'cocstorage-ui';

import { StorageBoard } from '@dto/storage-boards';

import {
  StyledStorageBoardCard,
  ThumbnailWrapper,
  ThumbnailInner,
  Thumbnail,
  Storage,
  Info,
  InfoLabel
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'emphasize' | 'normal' | 'compact';
  storageBoard: StorageBoard;
}

function StorageBoardCard({
  variant = 'compact',
  storageBoard: {
    storage: { name, avatarUrl },
    subject,
    viewCount = 0,
    commentTotalCount = 0,
    thumbUp = 0,
    thumbnailUrl,
    createdAt
  },
  ...props
}: StorageBoardCardProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();

  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const handleError = useCallback(() => setLoadFailed(true), []);

  const src = useMemo<string>(() => {
    if (loadFailed || !thumbnailUrl) {
      return 'https://static.cocstorage.com/assets/thumbnail.png';
    }

    return thumbnailUrl;
  }, [thumbnailUrl, loadFailed]);

  if (variant === 'emphasize') {
    return (
      <StyledStorageBoardCard variant={variant} {...props}>
        <ThumbnailWrapper theme={theme} variant={variant}>
          <ThumbnailInner>
            <Thumbnail width={246} src={src} alt="Thumbnail Img" onError={handleError} />
          </ThumbnailInner>
        </ThumbnailWrapper>
        <Flexbox direction="vertical" justifyContent="space-between">
          <Flexbox direction="vertical" gap={8}>
            <Storage>
              <Avatar round width="14px" height="14px" src={avatarUrl || ''} alt="Storage Img" />
              <Typography
                component="span"
                fontSize="10px"
                lineHeight="13px"
                color={palette.text[type].text1}
              >
                {name}
              </Typography>
            </Storage>
            <Typography component="div" lineHeight="18px" noWrap lineClamp={2}>
              {subject}
            </Typography>
          </Flexbox>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {viewCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {commentTotalCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {thumbUp.toLocaleString()}
              </Typography>
            </InfoLabel>
          </Info>
        </Flexbox>
      </StyledStorageBoardCard>
    );
  }

  if (variant === 'normal') {
    return (
      <StyledStorageBoardCard variant={variant} {...props}>
        <ThumbnailWrapper theme={theme} variant={variant}>
          <ThumbnailInner>
            <Thumbnail width={82} src={src} alt="Thumbnail Img" onError={handleError} />
          </ThumbnailInner>
        </ThumbnailWrapper>
        <Flexbox direction="vertical" justifyContent="space-between" gap={8}>
          <Typography component="div" lineHeight="18px" noWrap lineClamp={2}>
            {subject}
          </Typography>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {viewCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {commentTotalCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px" lineHeight="13px">
                {thumbUp.toLocaleString()}
              </Typography>
            </InfoLabel>
            <Storage>
              <Avatar width="14px" height="14px" src={avatarUrl || ''} alt="Storage Img" />
              <Typography
                component="span"
                fontSize="10px"
                lineHeight="13px"
                color={palette.text[type].text1}
              >
                {name}
              </Typography>
            </Storage>
          </Info>
        </Flexbox>
      </StyledStorageBoardCard>
    );
  }

  return (
    <StyledStorageBoardCard variant={variant} {...props}>
      <Flexbox direction="vertical" justifyContent="space-between" gap={8}>
        <Typography component="div" lineHeight="18px" noWrap lineClamp={1}>
          {dayjs().diff(createdAt, 'day') <= 1 && (
            <Badge
              severity="success"
              customStyle={{
                verticalAlign: 'middle',
                marginRight: 4
              }}
            >
              NEW
            </Badge>
          )}
          {subject}
        </Typography>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px" lineHeight="13px">
              {viewCount.toLocaleString()}
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px" lineHeight="13px">
              {commentTotalCount.toLocaleString()}
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="ThumbsUpOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px" lineHeight="13px">
              {thumbUp.toLocaleString()}
            </Typography>
          </InfoLabel>
          <Storage>
            <Avatar round width="14px" height="14px" src={avatarUrl || ''} alt="Storage Img" />
            <Typography
              component="span"
              fontSize="10px"
              lineHeight="13px"
              color={palette.text[type].text1}
            >
              {name}
            </Typography>
          </Storage>
        </Info>
      </Flexbox>
      <ThumbnailWrapper theme={theme} variant={variant}>
        <ThumbnailInner>
          <Thumbnail width={61} src={src} alt="Thumbnail Img" onError={handleError} />
        </ThumbnailInner>
      </ThumbnailWrapper>
    </StyledStorageBoardCard>
  );
}

export default memo(StorageBoardCard);
