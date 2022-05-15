import { useState } from 'react';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import Reply from '@components/UI/molecules/Reply';
import CommentForm from '@components/UI/organisms/CommentForm';

import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  comment: StorageBoardComment;
}

function Comment({ comment }: CommentProps) {
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
        {comment.isMember && comment.user?.avatarUrl && (
          <Avatar width={30} height={30} src={comment.user?.avatarUrl} alt="User Avatar" />
        )}
        <Flexbox gap={8} direction="vertical" customStyle={{ flex: 1 }}>
          <Flexbox gap={4}>
            <Typography fontSize="12px" fontWeight={700} lineHeight="15px">
              {comment.nickname || comment.user?.nickname}
            </Typography>
            {!comment.user && comment.createdIp && (
              <Typography fontSize="10px" fontWeight={700} lineHeight="15px">
                ({comment.createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="18px" customStyle={{ marginTop: 4 }}>
            {comment.content.split('\n').map((content, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`comment-content-${index}`}>{content}</span>
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
                {dayjs(comment.createdAt).fromNow()}
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
            {comment.replies.length > 0 && (
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
                  {`답글 ${comment.replies.length}개`}
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
            <CommentForm type="storageBoardReply" commentId={0} />
          </Flexbox>
          {comment.replies.map((reply) => (
            <Reply key={`reply-${reply.id}`} reply={reply} />
          ))}
        </Flexbox>
      )}
    </>
  );
}

export default Comment;
