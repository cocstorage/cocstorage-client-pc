import { RefObject, useState } from 'react';

import { Icon, Menu, Typography } from 'cocstorage-ui';

import CommentDeleteDialog from '@components/UI/organisms/CommentDeleteDialog';

import { List, ListItem } from './CommentMenu.styles';

interface CommentMenuProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  storageId?: number;
  id: number;
  commentId: number;
  onClose: () => void;
}

function CommentMenu({ open, anchorRef, storageId, id, commentId, onClose }: CommentMenuProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClick = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <>
      <Menu open={open} anchorRef={anchorRef} onClose={onClose}>
        <List>
          <ListItem onClick={handleClick}>
            <Icon name="InfoOutlined" color="primary" />
            <Typography>댓글 삭제</Typography>
          </ListItem>
        </List>
      </Menu>
      <CommentDeleteDialog
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
