import { memo, useRef, useState } from 'react';

import { Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import RatioImage from '@components/UI/atoms/RatioImage';
import ReplyMenu from '@components/UI/organisms/ReplyMenu';

import { NoticeCommentReply } from '@dto/notice-comment-replies';
import { StorageBoardCommentReply } from '@dto/storage-board-comment-replies';

interface ReplyProps {
  type?: 'storageBoard' | 'notice';
  storageId?: number;
  id: number;
  commentId: number;
  reply: StorageBoardCommentReply | NoticeCommentReply;
}

function Reply({
  type = 'storageBoard',
  storageId,
  id,
  commentId,
  reply: { id: replyId, user, nickname, content, createdAt, createdIp, isMember }
}: ReplyProps) {
  const {
    theme: {
      type: themeType,
      palette: { text }
    }
  } = useTheme();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
          borderColor: text[themeType].text3
        }
      }}
    >
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
        <Flexbox gap={4} alignment="center">
          <Typography variant="s1" fontWeight="bold">
            {nickname || (user || {}).nickname}
          </Typography>
          {!user && createdIp && (
            <Typography variant="s2" color={text[themeType].text1}>
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
            color: text[themeType].text1
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
            startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
            onClick={handleClickMenu}
            iconOnly
          />
          <ReplyMenu
            type={type}
            open={menuOpen}
            anchorRef={buttonRef}
            storageId={storageId}
            id={id}
            commentId={commentId}
            replyId={replyId}
            onClose={handleCloseMenu}
          />
        </Flexbox>
      )}
    </Flexbox>
  );
}

export default memo(Reply);
