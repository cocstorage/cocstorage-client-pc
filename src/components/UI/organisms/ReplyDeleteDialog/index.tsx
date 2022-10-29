import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

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

import { useStorageBoardData } from '@hooks/query/useStorageBoard';

import {
  DeleteNoticeCommentReplyData,
  deleteNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import {
  DeleteStorageBoardCommentReplyData,
  deleteNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';

import queryKeys from '@constants/queryKeys';

interface ReplyDeleteDialogProps {
  type?: 'storageBoard' | 'notice';
  open: boolean;
  commentId: number;
  replyId: number;
  onClose: () => void;
}

function ReplyDeleteDialog({
  type = 'storageBoard',
  open,
  commentId,
  replyId,
  onClose
}: ReplyDeleteDialogProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      palette: { secondary, text }
    }
  } = useTheme();

  const params = useRecoilValue(storageBoardCommentsParamsState);
  const noticeCommentParams = useRecoilValue(noticeCommentsParamsState);

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const queryClient = useQueryClient();

  const { storage: { id: storageId = 0 } = {} } = useStorageBoardData(Number(id)) || {};

  const { mutate, isLoading } = useMutation(
    (data: DeleteStorageBoardCommentReplyData) => deleteNonMemberStorageBoardCommentReply(data),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(
              Number(id),
              params.page || 1
            )
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

  const { mutate: noticeCommentReplyMutate, isLoading: noticeCommentReplyIsLoading } = useMutation(
    (data: DeleteNoticeCommentReplyData) => deleteNonMemberNoticeCommentReply(data),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            queryKeys.noticeComments.noticeCommentsByIdWithPage(
              Number(id),
              noticeCommentParams.page || 1
            )
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
        storageId,
        id: Number(id),
        commentId,
        replyId,
        password: value
      });
    } else if (type === 'notice') {
      noticeCommentReplyMutate({
        id: Number(id),
        commentId,
        replyId,
        password: value
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      customStyle={{
        maxWidth: 475
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
          답글을 삭제하려면 비밀번호를 입력해 주세요.
        </Typography>
        <Box component="form" customStyle={{ marginTop: 30 }}>
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
            disabled={!value || isLoading || noticeCommentReplyIsLoading}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default ReplyDeleteDialog;
