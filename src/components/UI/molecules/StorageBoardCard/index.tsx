import React, { useMemo, memo, ButtonHTMLAttributes } from 'react';
import dayjs from 'dayjs';

import { useTheme, Typography, Icon, Flexbox, Badge } from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';

import { StorageBoard } from '@dto/storage-boards';

import {
  StyledStorageBoardCard,
  Storage,
  Info,
  InfoLabel,
  UserInfo,
  Dot
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'emphasize' | 'normal' | 'compact';
  badgeVariant?: string | 'latest' | 'popular' | 'worst';
  storageBoard: StorageBoard;
  inStorage?: boolean;
}

function StorageBoardCard({
  variant = 'compact',
  badgeVariant = 'latest',
  storageBoard: {
    user,
    storage: { name, avatarUrl },
    nickname,
    subject,
    viewCount = 0,
    commentTotalCount = 0,
    thumbUp = 0,
    thumbnailUrl,
    createdAt
  },
  inStorage = true,
  ...props
}: StorageBoardCardProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();

  const round = useMemo<number>(() => {
    if (variant === 'emphasize') {
      return 12;
    }
    if (variant === 'normal') {
      return 6;
    }

    return 8;
  }, [variant]);

  if (variant === 'emphasize') {
    return (
      <StyledStorageBoardCard variant={variant} hasThumbnail={!!thumbnailUrl} {...props}>
        <RatioImage
          ratio="16:9"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={183}
          round={round}
        />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          customStyle={{ height: '100%' }}
        >
          <Flexbox direction="vertical" gap={8}>
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src={avatarUrl || ''}
                alt="Storage Logo Img"
                round={6}
              />
              <Typography component="span" fontSize="10px" color={palette.text[type].text1}>
                {name}
              </Typography>
            </Storage>
            <Typography noWrap lineClamp={2} lineHeight="18px">
              {subject}
            </Typography>
          </Flexbox>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {viewCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {commentTotalCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
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
      <StyledStorageBoardCard variant={variant} hasThumbnail={!!thumbnailUrl} {...props}>
        <RatioImage
          ratio="4:3"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={82}
          round={round}
        />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={8}
          customStyle={{ height: '100%' }}
        >
          <Typography noWrap lineClamp={2} lineHeight="18px">
            {subject}
          </Typography>
          <Info>
            <InfoLabel>
              <Icon name="ViewOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {viewCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="CommentOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {commentTotalCount.toLocaleString()}
              </Typography>
            </InfoLabel>
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {thumbUp.toLocaleString()}
              </Typography>
            </InfoLabel>
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src={avatarUrl || ''}
                alt="Storage Logo Img"
                round={6}
              />
              <Typography component="span" fontSize="10px" color={palette.text[type].text1}>
                {name}
              </Typography>
            </Storage>
          </Info>
        </Flexbox>
      </StyledStorageBoardCard>
    );
  }

  return (
    <StyledStorageBoardCard variant={variant} hasThumbnail={!!thumbnailUrl} {...props}>
      <Flexbox
        direction="vertical"
        justifyContent="space-between"
        gap={6}
        customStyle={{ height: '100%' }}
      >
        <Flexbox gap={4} alignment="center">
          {badgeVariant === 'latest' && dayjs().diff(createdAt, 'day') <= 1 && (
            <Badge severity="success">NEW</Badge>
          )}
          {badgeVariant === 'popular' && (
            <Badge
              severity="info"
              startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
              iconOnly
              customStyle={{
                width: 18,
                height: 18
              }}
            />
          )}
          {badgeVariant === 'worst' && (
            <Badge
              severity="error"
              startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
              iconOnly
              customStyle={{
                width: 18,
                height: 18
              }}
            />
          )}
          <Typography
            noWrap
            lineClamp={1}
            lineHeight="18px"
            customStyle={{
              textAlign: 'left'
            }}
          >
            {subject}
          </Typography>
        </Flexbox>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px">
              {viewCount.toLocaleString()}
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px">
              {commentTotalCount.toLocaleString()}
            </Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="ThumbsUpOutlined" width={14} height={14} />
            <Typography component="span" fontSize="10px">
              {thumbUp.toLocaleString()}
            </Typography>
          </InfoLabel>
          {!inStorage && (
            <Storage>
              <RatioImage
                width={14}
                height={14}
                src={avatarUrl || ''}
                alt="Storage Logo Img"
                round={6}
              />
              <Typography component="span" fontSize="10px" color={palette.text[type].text1}>
                {name}
              </Typography>
            </Storage>
          )}
          {inStorage && (
            <UserInfo theme={theme}>
              <Flexbox gap={4} alignment="center">
                {user?.avatarUrl && (
                  <RatioImage
                    src={user?.avatarUrl || ''}
                    alt="User Avatar Img"
                    width={14}
                    height={14}
                    round="50%"
                  />
                )}
                <Typography component="span" fontSize="10px" color={palette.text[type].text1}>
                  {user?.nickname || nickname}
                </Typography>
              </Flexbox>
              <Dot />
              <Typography component="span" fontSize="10px" color={palette.text[type].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          )}
        </Info>
      </Flexbox>
      {thumbnailUrl && (
        <RatioImage
          ratio="16:9"
          src={thumbnailUrl || ''}
          alt="Thumbnail Img"
          width={61}
          round={round}
        />
      )}
    </StyledStorageBoardCard>
  );
}

export default memo(StorageBoardCard);
