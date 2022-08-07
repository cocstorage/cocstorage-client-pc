import { useRef, useState } from 'react';

import { Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import RatioImage from '@components/UI/atoms/RatioImage';
import { CommentMenu, Reply, ReplyForm } from '@components/UI/organisms';

import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  type?: 'storageBoard' | 'notice';
  storageId?: number;
  id: number;
  comment: StorageBoardComment | NoticeComment;
}

function Comment({
  type = 'storageBoard',
  storageId,
  id,
  comment: { id: commentId, user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const {
    theme: {
      type: themeType,
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
        <RatioImage
          width={30}
          height={30}
          src={(user || {}).avatarUrl || ''}
          alt="User Avatar Img"
          round="50%"
          defaultIcon="user"
          defaultIconWidth={15}
          defaultIconHeight={15}
        />
        <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
          <Flexbox gap={4} alignment="flex-end">
            <Typography variant="s1" fontWeight="bold">
              {nickname || (user || {}).nickname}
            </Typography>
            {!user && createdIp && (
              <Typography variant="s2" color={text[themeType].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography customStyle={{ marginTop: 4 }}>
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
                variant="s1"
                customStyle={{
                  color: text[themeType].text1
                }}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography
                variant="s1"
                customStyle={{ cursor: 'pointer', color: text[themeType].text1 }}
                onClick={handleClick}
              >
                답글달기
              </Typography>
            </Flexbox>
            {replies.length > 0 && (
              <Flexbox gap={10} alignment="center">
                <Box
                  customStyle={{ width: 24, height: 1, backgroundColor: text[themeType].text3 }}
                />
                <Typography
                  variant="s1"
                  customStyle={{
                    color: text[themeType].text1,
                    cursor: 'pointer'
                  }}
                  onClick={handleClick}
                >
                  {open ? '답글 숨기기' : `답글 ${replies.length}개`}
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
              type={type}
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
                borderColor: text[themeType].text3
              }
            }}
          >
            <ReplyForm type={type} storageId={storageId} id={id} commentId={commentId} />
          </Flexbox>
          {replies.map((reply) => (
            <Reply
              key={`reply-${reply.id}`}
              type={type}
              storageId={storageId}
              id={id}
              commentId={commentId}
              reply={reply}
            />
          ))}
        </Flexbox>
      )}
    </>
  );
}

export default Comment;
