import { useState } from 'react';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import Reply from '@components/UI/molecules/Reply';
import ReplyForm from '@components/UI/organisms/ReplyForm';

import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  storageId: number;
  id: number;
  comment: StorageBoardComment;
}

function Comment({
  storageId,
  id,
  comment: { id: commentId, user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <Flexbox gap={10} customStyle={{ flex: 1 }}>
        {isMember && (user || {}).avatarUrl && (
          <Avatar width={30} height={30} src={(user || {}).avatarUrl || ''} alt="User Avatar" />
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
              <div key={`comment-content-${index}`}>{splitContent}</div>
            ))}
          </Typography>
          <Flexbox direction="vertical" gap={15}>
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
              <Typography
                fontSize="12px"
                lineHeight="15px"
                customStyle={{ cursor: 'pointer', color: text[type].text1 }}
                onClick={handleClick}
              >
                답글달기
              </Typography>
            </Flexbox>
            {replies.length > 0 && (
              <Flexbox gap={10} alignment="center">
                <Box customStyle={{ width: 24, height: 1, backgroundColor: text[type].text3 }} />
                <Typography
                  fontSize="12px"
                  lineHeight="15px"
                  customStyle={{
                    color: text[type].text1,
                    cursor: 'pointer'
                  }}
                  onClick={handleClick}
                >
                  {`답글 ${replies.length}개`}
                </Typography>
              </Flexbox>
            )}
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
      {open && (
        <Flexbox gap={18} direction="vertical" customStyle={{ margin: '15px 0' }}>
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
            <ReplyForm storageId={storageId} id={id} commentId={commentId} />
          </Flexbox>
          {replies.map((reply) => (
            <Reply key={`reply-${reply.id}`} reply={reply} />
          ))}
        </Flexbox>
      )}
    </>
  );
}

export default Comment;
