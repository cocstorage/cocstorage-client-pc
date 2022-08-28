import { RefObject, useState } from 'react';

import { Icon, Menu, Typography } from 'cocstorage-ui';

import CommentDeleteDialog from '@components/UI/organisms/CommentDeleteDialog';

import { List, ListItem } from './CommentMenu.styles';

interface CommentMenuProps {
  type?: 'storageBoard' | 'notice';
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  storageId?: number;
  id: number;
  commentId: number;
  onClose: () => void;
}

function CommentMenu({
  type = 'storageBoard',
  open,
  anchorRef,
  storageId,
  id,
  commentId,
  onClose
}: CommentMenuProps) {
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
            <Icon name="CloseOutlined" />
            <Typography>댓글 삭제</Typography>
          </ListItem>
        </List>
      </Menu>
      <CommentDeleteDialog
        type={type}
        open={dialogOpen}
        storageId={storageId}
        id={id}
        commentId={commentId}
        onClose={handleClose}
      />
    </>
  );
}

export default CommentMenu;
