import { ButtonHTMLAttributes, memo } from 'react';

import { Badge, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import RatioImage from '@components/UI/atoms/RatioImage';

import { Notice } from '@dto/notices';

import { Dot, Info, InfoLabel, StyledNoticeCard, UserInfo } from './Notice.styles';

export interface NoticeCardProps extends ButtonHTMLAttributes<HTMLDivElement> {
  notice: Notice;
}

function NoticeCard({
  notice: { user, subject, viewCount = 0, commentTotalCount = 0, thumbnailUrl, createdAt },
  ...props
}: NoticeCardProps) {
  const {
    theme: { type, palette }
  } = useTheme();

  return (
    <StyledNoticeCard hasThumbnail={!!thumbnailUrl} {...props}>
      <RatioImage ratio="4:3" src={thumbnailUrl || ''} alt="Thumbnail Img" width={82} round={6} />
      <Flexbox
        direction="vertical"
        justifyContent="space-between"
        gap={8}
        customStyle={{ height: '100%' }}
      >
        <Typography noWrap lineClamp={2} customStyle={{ flex: 1 }}>
          {dayjs().diff(createdAt, 'day') <= 1 && (
            <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'middle' }}>
              NEW
            </Badge>
          )}
          {subject}
        </Typography>
        <Info>
          <InfoLabel>
            <Icon name="ViewOutlined" width={14} height={14} />
            <Typography variant="s2">{viewCount.toLocaleString()}</Typography>
          </InfoLabel>
          <InfoLabel>
            <Icon name="CommentOutlined" width={14} height={14} />
            <Typography variant="s2">{commentTotalCount.toLocaleString()}</Typography>
          </InfoLabel>
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
              <Typography variant="s2" color={palette.text[type].text1}>
                {user?.nickname}
              </Typography>
            </Flexbox>
            <Dot />
            <Typography variant="s2" color={palette.text[type].text1}>
              {dayjs(createdAt).fromNow()}
            </Typography>
          </UserInfo>
        </Info>
      </Flexbox>
    </StyledNoticeCard>
  );
}

export default memo(NoticeCard);
