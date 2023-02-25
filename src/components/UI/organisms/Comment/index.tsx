import { memo, useRef, useState } from 'react';

import dayjs from 'dayjs';

import { Avatar, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import { CommentMenu, Reply, ReplyForm } from '@components/UI/organisms';

import { NoticeComment } from '@dto/notice-comments';
import { StorageBoardComment } from '@dto/storage-board-comments';

interface CommentProps {
  type?: 'storageBoard' | 'notice';
  comment: StorageBoardComment | NoticeComment;
}

function Comment({
  type = 'storageBoard',
  comment: { id: commentId, user, nickname, content = '', replies, createdAt, createdIp, isMember }
}: CommentProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => setOpen(!open);

  const handleClickMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <>
      <Flexbox gap={10} customStyle={{ flex: 1 }}>
        <Avatar
          width={30}
          height={30}
          src={(user || {}).avatarUrl || ''}
          alt="User Avatar Img"
          fallback={{
            iconName: 'UserFilled',
            width: 15,
            height: 15
          }}
        />
        <Flexbox direction="vertical" customStyle={{ flex: 1 }}>
          <Flexbox gap={4} alignment="center">
            <Typography variant="s1" fontWeight="bold">
              {nickname || (user || {}).nickname}
            </Typography>
            {!user && createdIp && (
              <Typography variant="s2" color={text[mode].text1}>
                ({createdIp})
              </Typography>
            )}
          </Flexbox>
          <Typography lineHeight="main" customStyle={{ marginTop: 4 }}>
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
                  color: text[mode].text1
                }}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography
                variant="s1"
                customStyle={{ cursor: 'pointer', color: text[mode].text1 }}
                onClick={handleClick}
              >
                {replies.length > 0 ? `답글 ${replies.length.toLocaleString()}개` : '답글달기'}
              </Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>
        {!isMember && (
          <Flexbox alignment="center" customStyle={{ position: 'relative' }}>
            <Button
              ref={buttonRef}
              variant="transparent"
              size="pico"
              startIcon={<Icon name="MoreMenuOutlined" />}
              onClick={handleClickMenu}
              iconOnly
            />
            <CommentMenu
              type={type}
              open={menuOpen}
              anchorRef={buttonRef}
              commentId={commentId}
              onClose={handleCloseMenu}
            />
          </Flexbox>
        )}
      </Flexbox>
      {open && (
        <Flexbox gap={18} direction="vertical" customStyle={{ margin: '15px 0 0 40px' }}>
          {replies.map((reply) => (
            <Reply key={`reply-${reply.id}`} type={type} commentId={commentId} reply={reply} />
          ))}
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
                borderColor: text[mode].text3
              }
            }}
          >
            <ReplyForm type={type} commentId={commentId} />
          </Flexbox>
        </Flexbox>
      )}
      {!open && replies.length > 0 && (
        <Flexbox gap={18} direction="vertical" customStyle={{ margin: '15px 0 0 40px' }}>
          {replies.slice(0, 3).map((reply) => (
            <Reply key={`reply-${reply.id}`} type={type} commentId={commentId} reply={reply} />
          ))}
        </Flexbox>
      )}
      {replies.length > 3 && (
        <Flexbox alignment="center" customStyle={{ marginLeft: 40 }}>
          <Icon name={!open ? 'CaretDownOutlined' : 'CaretUpOutlined'} color={text[mode].text1} />
          <Typography
            variant="s1"
            customStyle={{
              color: text[mode].text1,
              cursor: 'pointer'
            }}
            onClick={handleClick}
          >
            {open ? '답글 숨기기' : `답글 ${(replies.length - 3).toLocaleString()}개 더 보기`}
          </Typography>
        </Flexbox>
      )}
    </>
  );
}

export default memo(Comment);
