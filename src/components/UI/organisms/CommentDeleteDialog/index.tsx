import { ChangeEvent, useState } from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { useRecoilValue } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import {
  Box,
  Button,
  Dialog,
  Flexbox,
  Icon,
  IconButton,
  TextBar,
  Typography,
  useTheme
} from 'cocstorage-ui';

import { deleteNonMemberStorageBoardComment } from '@api/v1/storage-board-comments';

import queryKeys from '@constants/react-query';

interface CommentDeleteDialogProps {
  open: boolean;
  storageId?: number;
  id: number;
  commentId: number;
  onClose: () => void;
}

function CommentDeleteDialog({
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

  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>('');
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
    mutate({
      storageId: storageId as number,
      id,
      commentId,
      password: value,
      shouldBeHandledByGlobalErrorHandler: false
    });
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
          fontSize="18px"
          fontWeight={700}
          lineHeight="23px"
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
          <Box customStyle={{ display: 'none' }}>
            <input type="text" autoComplete="username" />
          </Box>
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
            disabled={!value || isLoading}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default CommentDeleteDialog;
