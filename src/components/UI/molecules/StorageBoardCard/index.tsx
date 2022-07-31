import { ButtonHTMLAttributes, memo, useMemo } from 'react';

import { Badge, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import RatioImage from '@components/UI/atoms/RatioImage';

import { StorageBoard } from '@dto/storage-boards';

import {
  Dot,
  Info,
  InfoLabel,
  Storage,
  StyledStorageBoardCard,
  UserInfo
} from './StorageBoardCard.styles';

export interface StorageBoardCardProps extends ButtonHTMLAttributes<HTMLDivElement> {
  variant?: 'emphasize' | 'normal' | 'compact';
  storageBoard: StorageBoard;
  hideSymbolismBadge?: boolean;
  inStorage?: boolean;
}

function StorageBoardCard({
  variant = 'compact',
  storageBoard: {
    user,
    storage: { name, avatarUrl },
    nickname,
    subject,
    viewCount = 0,
    commentTotalCount = 0,
    thumbUp = 0,
    thumbDown = 0,
    thumbnailUrl,
    isPopular,
    isWorst,
    createdAt
  },
  hideSymbolismBadge = false,
  inStorage = true,
  ...props
}: StorageBoardCardProps) {
  const {
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
            <Typography noWrap lineClamp={2} lineHeight="18px" customStyle={{ flex: 1 }}>
              {dayjs().diff(createdAt, 'day') <= 1 && (
                <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'middle' }}>
                  NEW
                </Badge>
              )}
              {!hideSymbolismBadge && isPopular && (
                <Badge
                  severity="info"
                  startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
                  iconOnly
                  customStyle={{
                    marginRight: 4,
                    verticalAlign: 'middle'
                  }}
                />
              )}
              {!hideSymbolismBadge && isWorst && (
                <Badge
                  severity="error"
                  startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
                  iconOnly
                  customStyle={{
                    marginRight: 4,
                    verticalAlign: 'middle'
                  }}
                />
              )}
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
            {isWorst && (
              <InfoLabel>
                <Icon name="ThumbsDownOutlined" width={14} height={14} />
                <Typography component="span" fontSize="10px">
                  {thumbDown.toLocaleString()}
                </Typography>
              </InfoLabel>
            )}
            {!isWorst && (
              <InfoLabel>
                <Icon name="ThumbsUpOutlined" width={14} height={14} />
                <Typography component="span" fontSize="10px">
                  {thumbUp.toLocaleString()}
                </Typography>
              </InfoLabel>
            )}
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
          <Typography noWrap lineClamp={2} lineHeight="18px" customStyle={{ flex: 1 }}>
            {dayjs().diff(createdAt, 'day') <= 1 && (
              <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'middle' }}>
                NEW
              </Badge>
            )}
            {!hideSymbolismBadge && isPopular && (
              <Badge
                severity="info"
                startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
                iconOnly
                customStyle={{
                  marginRight: 4,
                  verticalAlign: 'middle'
                }}
              />
            )}
            {!hideSymbolismBadge && isWorst && (
              <Badge
                severity="error"
                startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
                iconOnly
                customStyle={{
                  marginRight: 4,
                  verticalAlign: 'middle'
                }}
              />
            )}
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
            {isWorst && (
              <InfoLabel>
                <Icon name="ThumbsDownOutlined" width={14} height={14} />
                <Typography component="span" fontSize="10px">
                  {thumbDown.toLocaleString()}
                </Typography>
              </InfoLabel>
            )}
            {!isWorst && (
              <InfoLabel>
                <Icon name="ThumbsUpOutlined" width={14} height={14} />
                <Typography component="span" fontSize="10px">
                  {thumbUp.toLocaleString()}
                </Typography>
              </InfoLabel>
            )}
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
          {dayjs().diff(createdAt, 'day') <= 1 && <Badge severity="success">NEW</Badge>}
          {!hideSymbolismBadge && isPopular && (
            <Badge
              severity="info"
              startIcon={<Icon name="ThumbsUpFilled" width={12} height={12} />}
              iconOnly
            />
          )}
          {!hideSymbolismBadge && isWorst && (
            <Badge
              severity="error"
              startIcon={<Icon name="ThumbsDownFilled" width={12} height={12} />}
              iconOnly
            />
          )}
          <Typography
            noWrap
            lineClamp={1}
            lineHeight="18px"
            customStyle={{
              flex: 1,
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
          {isWorst && (
            <InfoLabel>
              <Icon name="ThumbsDownOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {thumbDown.toLocaleString()}
              </Typography>
            </InfoLabel>
          )}
          {!isWorst && (
            <InfoLabel>
              <Icon name="ThumbsUpOutlined" width={14} height={14} />
              <Typography component="span" fontSize="10px">
                {thumbUp.toLocaleString()}
              </Typography>
            </InfoLabel>
          )}
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
            <UserInfo>
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
