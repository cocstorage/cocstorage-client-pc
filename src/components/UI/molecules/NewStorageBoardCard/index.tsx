import { HTMLAttributes } from 'react';

import Link from 'next/link';

import dayjs from 'dayjs';

import { Avatar, Badge, Box, Flexbox, Icon, Image, Typography, useTheme } from 'cocstorage-ui';

import { StorageBoard } from '@dto/storage-boards';

interface NewStorageBoardCardProps extends HTMLAttributes<HTMLDivElement> {
  storageBoard: StorageBoard;
}

function NewStorageBoardCard({
  storageBoard: {
    id,
    user,
    storage: { path },
    nickname,
    subject,
    description,
    viewCount,
    commentTotalCount,
    thumbUp,
    thumbDown,
    thumbnailUrl,
    createdAt
  }
}: NewStorageBoardCardProps) {
  const {
    theme: {
      mode,
      palette: { box, text, others }
    }
  } = useTheme();

  return (
    <Box
      customStyle={{
        '& a:visited .subject': {
          color: others.visited
        }
      }}
    >
      <Link href={`/storages/${path}/${id}`}>
        <Flexbox
          alignment="center"
          gap={20}
          customStyle={{
            padding: '20px 0',
            borderBottom: `1px solid ${box.stroked.normal}`,
            cursor: 'pointer',
            '& a:visited .subject': {
              color: others.visited
            }
          }}
        >
          <Flexbox
            direction="vertical"
            customStyle={{
              flex: 1,
              overflow: 'hidden'
            }}
          >
            {/* TODO UI 라이브러리 반영 */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Flexbox gap={4} alignment="center">
              {dayjs().diff(createdAt, 'day') <= 1 && (
                <Badge
                  severity="success"
                  customStyle={{ height: 'fit-content', verticalAlign: 'bottom' }}
                >
                  NEW
                </Badge>
              )}
              <Typography
                variant="h4"
                fontWeight="medium"
                noWrap
                lineClamp={2}
                className="subject"
                customStyle={{
                  flex: 1
                }}
              >
                {subject}
              </Typography>
            </Flexbox>
            {description && (
              <Typography
                noWrap
                lineClamp={2}
                color={text[mode].text2}
                customStyle={{
                  marginTop: 4
                }}
              >
                {description}
              </Typography>
            )}
            <Flexbox
              gap={32}
              customStyle={{
                marginTop: 20
              }}
            >
              <Flexbox gap={2}>
                <Avatar
                  width={16}
                  height={16}
                  round="50%"
                  src={(user || {}).avatarUrl || ''}
                  alt="User Avatar Img"
                  fallback={{
                    iconName: 'UserFilled',
                    width: 8,
                    height: 8
                  }}
                  customStyle={{
                    marginRight: 2
                  }}
                />
                <Typography variant="s1" fontWeight="medium">
                  {(user || {}).nickname || nickname}
                </Typography>
                <Typography
                  variant="s1"
                  color={text[mode].text2}
                  customStyle={{
                    minWidth: 8
                  }}
                >
                  ∙
                </Typography>
                <Typography variant="s1" color={text[mode].text2}>
                  {dayjs(createdAt).fromNow()}
                </Typography>
              </Flexbox>
              <Flexbox gap={12}>
                <Typography variant="s1">조회 {viewCount.toLocaleString()}</Typography>
                <Flexbox alignment="center" gap={2}>
                  <Icon name="CommentOutlined" width={16} height={16} color={text[mode].text2} />
                  <Typography variant="s1">{commentTotalCount.toLocaleString()}</Typography>
                </Flexbox>
                <Flexbox alignment="center" gap={2}>
                  <Icon name="ThumbsUpOutlined" width={16} height={16} color={text[mode].text2} />
                  <Typography variant="s1">{thumbUp.toLocaleString()}</Typography>
                </Flexbox>
                <Flexbox alignment="center" gap={2}>
                  <Icon name="ThumbsDownOutlined" width={16} height={16} color={text[mode].text2} />
                  <Typography variant="s1">{thumbDown.toLocaleString()}</Typography>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </Flexbox>
          {thumbnailUrl && (
            <Image
              ratio="4:3"
              src={thumbnailUrl}
              alt="StorageBoard Thumbnail"
              round={6}
              customStyle={{
                maxWidth: 144,
                minWidth: 144
              }}
            />
          )}
        </Flexbox>
      </Link>
    </Box>
  );
}

export default NewStorageBoardCard;
