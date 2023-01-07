import { RefObject, useState } from 'react';

import { Icon, Menu, Typography, useTheme } from 'cocstorage-ui';

import CommentDeleteDialog from '@components/UI/organisms/CommentDeleteDialog';

import { List, ListItem } from './CommentMenu.styles';

interface CommentMenuProps {
  type?: 'storageBoard' | 'notice';
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  commentId: number;
  onClose: () => void;
}

function CommentMenu({
  type = 'storageBoard',
  open,
  anchorRef,
  commentId,
  onClose
}: CommentMenuProps) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => setDialogOpen(true);
  const handleClose = () => {
    onClose();
    setDialogOpen(false);
  };

  return (
    <>
      <Menu open={open} anchorRef={anchorRef} onClose={onClose}>
        <List>
          <ListItem onClick={handleClick}>
            <Icon name="CloseOutlined" width={20} height={20} color={text[mode].text2} />
            <Typography>댓글 삭제</Typography>
          </ListItem>
        </List>
      </Menu>
      <CommentDeleteDialog
        type={type}
        open={dialogOpen}
        commentId={commentId}
        onClose={handleClose}
      />
    </>
  );
}

export default CommentMenu;
