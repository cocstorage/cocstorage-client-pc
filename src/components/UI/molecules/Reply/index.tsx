import { memo } from 'react';

import { Avatar, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import { StorageBoardReply } from '@dto/storage-board-comments';

interface ReplyProps {
  reply: StorageBoardReply;
}

function Reply({ reply: { user, nickname, content, createdAt, createdIp, isMember } }: ReplyProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  return (
    <Flexbox
      gap={10}
      customStyle={{
        '&:before': {
          display: 'block',
          content: '""',
          width: 8,
          height: 8,
          marginTop: 10,
          borderLeft: '1px solid',
          borderBottom: '1px solid',
          borderColor: text[type].text3
        }
      }}
    >
      {isMember && (user || {}).avatarUrl && (
        <Avatar
          width={30}
          height={30}
          src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
          alt="User Avatar"
        />
      )}
      <Flexbox gap={8} direction="vertical" customStyle={{ flex: 1 }}>
        <Flexbox gap={4}>
          <Typography fontSize="12px" fontWeight={700} lineHeight="15px">
            {nickname || (user || {}).nickname}
          </Typography>
          {!user && createdIp && (
            <Typography fontSize="10px" lineHeight="15px" color={text[type].text1}>
              ({createdIp})
            </Typography>
          )}
        </Flexbox>
        <Typography lineHeight="18px" customStyle={{ marginTop: 4 }}>
          {content.split('\n').map((splitContent, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`reply-content-${index}`}>
              {splitContent}
              <br />
            </span>
          ))}
        </Typography>
        <Flexbox direction="vertical" gap={11}>
          <Flexbox gap={12} alignment="center">
            <Typography
              fontSize="12px"
              lineHeight="15px"
              customStyle={{
                color: text[type].text1
              }}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox alignment="center">
        <Button
          variant="transparent"
          size="pico"
          startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
          iconOnly
        />
      </Flexbox>
    </Flexbox>
  );
}

export default memo(Reply);
