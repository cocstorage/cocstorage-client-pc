import { useRef, useState } from 'react';

import dayjs from 'dayjs';

import { Avatar, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import ReplyMenu from '@components/UI/organisms/ReplyMenu';

import { NoticeCommentReply } from '@dto/notice-comment-replies';
import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';

interface ReplyProps {
  type?: 'storageBoard' | 'notice';
  commentId: number;
  reply: StorageBoardCommentReply | NoticeCommentReply;
}

function Reply({
  type = 'storageBoard',
  commentId,
  reply: { id: replyId, user, nickname, content, createdAt, createdIp, isMember }
}: ReplyProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

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
          borderColor: text[mode].text3
        }
      }}
    >
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
            <span key={`reply-content-${index}`}>
              {splitContent}
              <br />
            </span>
          ))}
        </Typography>
        <Typography
          variant="s1"
          customStyle={{
            marginTop: 8,
            color: text[mode].text1
          }}
        >
          {dayjs(createdAt).fromNow()}
        </Typography>
      </Flexbox>
      {!isMember && (
        <Flexbox alignment="center">
          <Button
            ref={buttonRef}
            variant="transparent"
            size="pico"
            startIcon={<Icon name="MoreMenuOutlined" />}
            onClick={handleClickMenu}
            iconOnly
          />
          <ReplyMenu
            type={type}
            open={menuOpen}
            anchorRef={buttonRef}
            commentId={commentId}
            replyId={replyId}
            onClose={handleCloseMenu}
          />
        </Flexbox>
      )}
    </Flexbox>
  );
}

export default Reply;
