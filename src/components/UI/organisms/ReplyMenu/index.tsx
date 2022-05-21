import { RefObject, useState } from 'react';

import { Icon, Menu, Typography } from 'cocstorage-ui';

import ReplyDeleteDialog from '@components/UI/organisms/ReplyDeleteDialog';

import { List, ListItem } from './ReplyMenu.styles';

interface ReplyMenuProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  storageId?: number;
  id: number;
  commentId: number;
  replyId: number;
  onClose: () => void;
}

function ReplyMenu({
  open,
  anchorRef,
  storageId,
  id,
  commentId,
  replyId,
  onClose
}: ReplyMenuProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClick = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <>
      <Menu open={open} anchorRef={anchorRef} onClose={onClose}>
        <List>
          <ListItem onClick={handleClick}>
            <Icon name="CloseOutlined" />
            <Typography>답글 삭제</Typography>
          </ListItem>
        </List>
      </Menu>
      <ReplyDeleteDialog
        open={dialogOpen}
        storageId={storageId}
        id={id}
        commentId={commentId}
        replyId={replyId}
        onClose={handleClose}
      />
    </>
  );
}

export default ReplyMenu;
