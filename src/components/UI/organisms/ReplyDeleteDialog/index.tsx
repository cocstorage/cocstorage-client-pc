import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Dialog,
  Flexbox,
  Hidden,
  IconButton,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  DeleteNoticeCommentReplyData,
  deleteNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import {
  DeleteStorageBoardCommentReplyData,
  deleteNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';
import queryKeys from '@constants/queryKeys';
import { useStorageBoardData } from '@hooks/query/useStorageBoard';
import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

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
  const myPassword = useRecoilValue(myPasswordState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const noticeCommentParams = useRecoilValue(noticeCommentsParamsState);

  const [password, setPassword] = useState(myPassword);
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
    setPassword(event.currentTarget.value);
  };

  const handleClick = () => {
    handleClose();

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
        password
      });
    } else if (type === 'notice') {
      noticeCommentReplyMutate({
        id: Number(id),
        commentId,
        replyId,
        password
      });
    }
  };

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  useEffect(() => {
    if (!open) {
      setErrorMessage({
        error: false,
        message: ''
      });
      if (myPassword) setPassword(myPassword);
    }
  }, [open, myPassword]);

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
          <Tooltip
            open={!done}
            onClose={handleClose}
            content="저장된 비밀번호를 불러왔어요!"
            placement="top"
          >
            <TextBar
              type="password"
              fullWidth
              size="xBig"
              label="비밀번호"
              value={password}
              onChange={handleChange}
              autoFocus
            />
          </Tooltip>
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
            size="xBig"
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
            size="xBig"
            onClick={handleClick}
            customStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              backgroundColor: secondary.red.main,
              color: text.dark.main
            }}
            disabled={!password || isLoading || noticeCommentReplyIsLoading}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default ReplyDeleteDialog;
