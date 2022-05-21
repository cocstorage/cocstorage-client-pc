import { useRef, useState } from 'react';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import { CommentMenu, Reply, ReplyForm } from '@components/UI/organisms';

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => setOpen(!open);

  const handleClickMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <>
      <Flexbox gap={10} customStyle={{ flex: 1 }}>
        {isMember && (user || {}).avatarUrl && (
          <Avatar width={30} height={30} src={(user || {}).avatarUrl || ''} alt="User Avatar" />
        )}
        <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
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
              <span key={`comment-content-${index}`}>
                {splitContent}
                <br />
              </span>
            ))}
          </Typography>
          <Flexbox direction="vertical" gap={15} customStyle={{ marginTop: 8 }}>
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
        {!isMember && (
          <Flexbox alignment="center">
            <Button
              ref={buttonRef}
              variant="transparent"
              size="pico"
              startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
              onClick={handleClickMenu}
              iconOnly
            />
            <CommentMenu
              open={menuOpen}
              anchorRef={buttonRef}
              storageId={storageId}
              id={id}
              commentId={commentId}
              onClose={handleCloseMenu}
            />
          </Flexbox>
        )}
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
            <Reply key={`reply-${reply.id}`} storageId={storageId} id={id} reply={reply} />
          ))}
        </Flexbox>
      )}
    </>
  );
}

export default Comment;
