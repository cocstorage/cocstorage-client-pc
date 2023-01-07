import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
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
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import { useStorageBoardData } from '@hooks/query/useStorageBoard';
import useStorageBoardComments from '@hooks/query/useStorageBoardComments';

import { DeleteNoticeCommentData, deleteNonMemberNoticeComment } from '@api/v1/notice-comments';
import {
  DeleteStorageBoardCommentData,
  deleteNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

interface CommentDeleteDialogProps {
  type?: 'storageBoard' | 'notice';
  open: boolean;
  commentId: number;
  onClose: () => void;
}

function CommentDeleteDialog({
  type = 'storageBoard',
  open,
  commentId,
  onClose
}: CommentDeleteDialogProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      palette: { secondary, text }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const myPassword = useRecoilValue(myPasswordState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const noticeCommentsParams = useRecoilValue(noticeCommentsParamsState);

  const queryClient = useQueryClient();

  const { storage: { id: storageId = 0 } = {}, commentLatestPage = 0 } =
    useStorageBoardData(Number(id)) || {};

  const { data: { comments = [] } = {} } = useStorageBoardComments(storageId, Number(id), params, {
    enabled: type === 'storageBoard' && !!params.page,
    keepPreviousData: true
  });

  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { mutate, isLoading } = useMutation(
    (data: DeleteStorageBoardCommentData) => deleteNonMemberStorageBoardComment(data),
    {
      onSuccess: () => {
        const { page = 0 } = params;

        if (page > 1 && page === commentLatestPage && comments.length - 1 <= 0) {
          setParams((prevParams) => ({
            ...prevParams,
            page: commentLatestPage - 1 ? commentLatestPage - 1 : 1
          }));
        } else {
          queryClient
            .invalidateQueries(
              queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(Number(id), page || 1)
            )
            .then();
        }
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
    (data: DeleteNoticeCommentData) => deleteNonMemberNoticeComment(data),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            queryKeys.noticeComments.noticeCommentsByIdWithPage(
              Number(id),
              noticeCommentsParams.page || 1
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
        password
      });
    } else if (type === 'notice') {
      noticeCommentMutate({
        id: Number(id),
        commentId,
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
          {/* // TODO UI 라이브러리 Tooltip 컴포넌트 수정 필요 */}
          <Box
            onClick={handleClose}
            customStyle={{
              '& > div > div': {
                width: '100%'
              }
            }}
          >
            <Tooltip
              open={!done}
              onClose={handleClose}
              content="저장된 비밀번호를 불러왔어요!"
              placement="right"
            >
              <TextBar
                type="password"
                fullWidth
                size="big"
                label="비밀번호"
                value={password}
                onChange={handleChange}
                autoFocus
              />
            </Tooltip>
          </Box>
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
            disabled={!password || isLoading || noticeCommentIsLoading}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default CommentDeleteDialog;
