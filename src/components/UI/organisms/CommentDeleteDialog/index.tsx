import { ChangeEvent, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import { noticeCommentsParamsState } from '@recoil/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import {
  Box,
  Button,
  Dialog,
  Flexbox,
  Hidden,
  Icon,
  IconButton,
  TextBar,
  Typography,
  useTheme
} from 'cocstorage-ui';

import { deleteNonMemberNoticeComment } from '@api/v1/notice-comments';
import { deleteNonMemberStorageBoardComment } from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

interface CommentDeleteDialogProps {
  type?: 'storageBoard' | 'notice';
  open: boolean;
  storageId?: number;
  id: number;
  commentId: number;
  onClose: () => void;
}

function CommentDeleteDialog({
  type = 'storageBoard',
  open,
  storageId,
  id,
  commentId,
  onClose
}: CommentDeleteDialogProps) {
  const {
    theme: {
      palette: { secondary, text }
    }
  } = useTheme();

  const params = useRecoilValue(storageBoardCommentsParamsState);
  const noticeCommentsParams = useRecoilValue(noticeCommentsParamsState);

  const queryClient = useQueryClient();

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { mutate, isLoading } = useMutation(
    (data: {
      storageId: number;
      id: number;
      commentId: number;
      password: string;
      shouldBeHandledByGlobalErrorHandler?: boolean;
    }) =>
      deleteNonMemberStorageBoardComment(data.storageId, data.id, data.commentId, data.password),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(id, params.page || 1)
          )
          .then();
        onClose();
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const { mutate: noticeCommentMutate, isLoading: noticeCommentIsLoading } = useMutation(
    (data: {
      id: number;
      commentId: number;
      password: string;
      shouldBeHandledByGlobalErrorHandler?: boolean;
    }) => deleteNonMemberNoticeComment(data.id, data.commentId, data.password),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            queryKeys.noticeComments.noticeCommentsByIdWithPage(id, noticeCommentsParams.page || 1)
          )
          .then();
        onClose();
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.error) {
      setErrorMessage({
        error: false,
        message: ''
      });
    }
    setValue(event.currentTarget.value);
  };

  const handleClick = () => {
    setErrorMessage({
      error: false,
      message: ''
    });

    if (type === 'storageBoard') {
      mutate({
        storageId: storageId as number,
        id,
        commentId,
        password: value,
        shouldBeHandledByGlobalErrorHandler: false
      });
    } else if (type === 'notice') {
      noticeCommentMutate({
        id,
        commentId,
        password: value,
        shouldBeHandledByGlobalErrorHandler: false
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      customStyle={{
        maxWidth: 480
      }}
    >
      <Box
        customStyle={{
          padding: 30
        }}
      >
        <Box
          customStyle={{
            textAlign: 'right'
          }}
        >
          <IconButton onClick={onClose}>
            <Icon name="CloseOutlined" />
          </IconButton>
        </Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          customStyle={{ marginTop: 10, textAlign: 'center' }}
        >
          댓글을 삭제하려면 비밀번호를 입력해 주세요.
        </Typography>
        <Box
          component="form"
          customStyle={{
            marginTop: 30
          }}
        >
          <Hidden xsHidden>
            <input type="text" autoComplete="username" />
          </Hidden>
          <TextBar
            type="password"
            fullWidth
            size="big"
            label="비밀번호"
            value={value}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Box>
        {errorMessage.error && (
          <Typography customStyle={{ marginTop: 10, color: secondary.red.main }}>
            {errorMessage.message}
          </Typography>
        )}
        <Flexbox
          gap={20}
          customStyle={{
            marginTop: 20
          }}
        >
          <Button
            variant="text"
            size="big"
            onClick={onClose}
            customStyle={{
              flexGrow: 1,
              justifyContent: 'center'
            }}
          >
            취소하기
          </Button>
          <Button
            variant="accent"
            size="big"
            onClick={handleClick}
            customStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              backgroundColor: secondary.red.main,
              color: text.dark.main
            }}
            disabled={!value || isLoading || noticeCommentIsLoading}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default CommentDeleteDialog;
