import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Avatar, Badge, Flexbox, Image, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import dayjs from 'dayjs';

import { Notice } from '@dto/notices';

import { Dot, Info, InfoLabel, StyledNoticeCard, UserInfo, Wrapper } from './NoticeCard.styles';

export interface NoticeCardProps extends HTMLAttributes<HTMLDivElement> {
  notice: Notice;
}

function NoticeCard({
  notice: { id, user, subject, viewCount = 0, commentTotalCount = 0, thumbnailUrl, createdAt },
  ...props
}: NoticeCardProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  return (
    <StyledNoticeCard>
      <Link href={`/notices/${id}`}>
        <Wrapper {...props}>
          <Image
            ratio="4:3"
            width={82}
            height="auto"
            src={thumbnailUrl || ''}
            alt="Thumbnail Img"
          />
          <Flexbox
            direction="vertical"
            justifyContent="space-between"
            gap={8}
            customStyle={{ height: '100%' }}
          >
            <Typography className="subject" noWrap lineClamp={2} customStyle={{ flex: 1 }}>
              {dayjs().diff(createdAt, 'day') <= 1 && (
                <Badge severity="success" customStyle={{ marginRight: 4, verticalAlign: 'middle' }}>
                  NEW
                </Badge>
              )}
              {subject}
            </Typography>
            <Info>
              <InfoLabel>
                <Icon name="ViewOutlined" width={16} height={16} />
                <Typography variant="s2">{viewCount.toLocaleString()}</Typography>
              </InfoLabel>
              <InfoLabel>
                <Icon name="CommentOutlined" width={16} height={16} />
                <Typography variant="s2">{commentTotalCount.toLocaleString()}</Typography>
              </InfoLabel>
              <UserInfo>
                <Flexbox gap={4} alignment="center">
                  {user?.avatarUrl && (
                    <Avatar
                      width={14}
                      height={14}
                      src={user?.avatarUrl || ''}
                      alt="User Avatar Img"
                    />
                  )}
                  <Typography variant="s2" color={text[mode].text1}>
                    {user?.nickname}
                  </Typography>
                </Flexbox>
                <Dot />
                <Typography variant="s2" color={text[mode].text1}>
                  {dayjs(createdAt).fromNow()}
                </Typography>
              </UserInfo>
            </Info>
          </Flexbox>
        </Wrapper>
      </Link>
    </StyledNoticeCard>
  );
}

export default NoticeCard;
