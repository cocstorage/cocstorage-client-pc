import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import { storageBoardDeleteDialogOpenState } from '@recoil/pages/storageBoard/atoms';

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

import { deleteNonMemberStorageBoard } from '@api/v1/storage-boards';

function StorageBoardDeleteDialog() {
  const router = useRouter();
  const { path, id } = router.query;
  const {
    theme: {
      palette: { text, secondary }
    }
  } = useTheme();

  const [open, setOpenState] = useRecoilState(storageBoardDeleteDialogOpenState);
  const myPassword = useRecoilValue(myPasswordState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);

  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { id: storageBoardId = 0, storage: { id: storageId = 0 } = {} } =
    useStorageBoardData(Number(id)) || {};

  const { mutate, isLoading } = useMutation(
    ({
      storageId: newStorageId,
      id: newId,
      password: newPassword
    }: {
      storageId: number;
      id: number;
      password: string | number;
    }) => deleteNonMemberStorageBoard(newStorageId, newId, newPassword),
    {
      onSuccess: () => {
        setOpenState(false);
        router.push(`/storages/${path}`);
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleClose = () => setOpenState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage.error) {
      setErrorMessage({
        error: false,
        message: ''
      });
    }
    setPassword(event.currentTarget.value);
  };

  const handleClosePasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  const handleClick = () =>
    mutate({
      storageId,
      id: storageBoardId,
      password
    });

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
      onClose={handleClose}
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
          <IconButton onClick={handleClose}>
            <Icon name="CloseOutlined" />
          </IconButton>
        </Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          customStyle={{ marginTop: 10, textAlign: 'center' }}
        >
          게시글을 삭제하려면 비밀번호를 입력해 주세요.
        </Typography>
        <Typography
          component="div"
          variant="s1"
          fontWeight="medium"
          customStyle={{ marginTop: 4, textAlign: 'center' }}
        >
          삭제된 게시글은 복원이 되지 않아요.
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
          <Tooltip
            open={!done}
            onClose={handleClosePasswordTooltip}
            content="저장된 비밀번호를 불러왔어요!"
            placement="right"
            fillWrapper
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
            onClick={handleClose}
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
            disabled={!password || isLoading}
            customStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              backgroundColor: secondary.red.main,
              color: text.dark.main
            }}
          >
            삭제하기
          </Button>
        </Flexbox>
      </Box>
    </Dialog>
  );
}

export default StorageBoardDeleteDialog;
