import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardEditEditorContentsState,
  storageBoardEditNicknameState,
  storageBoardEditPasswordState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

import {
  Backdrop,
  Box,
  Button,
  Flexbox,
  Icon,
  IconButton,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

import { patchNonMemberStorageBoard } from '@api/v1/storage-boards';

function StorageBoardEditAuthDialog() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { secondary, background }
    }
  } = useTheme();

  const myPassword = useRecoilValue(myPasswordState);
  const [{ loadPassword: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const setEditPasswordPasswordState = useSetRecoilState(storageBoardEditPasswordState);
  const setSubjectState = useSetRecoilState(storageBoardEditSubjectState);
  const setNicknameState = useSetRecoilState(storageBoardEditNicknameState);
  const setEditorContentsState = useSetRecoilState(storageBoardEditEditorContentsState);

  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState(myPassword);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { data: { id: storageId = 0 } = {} } = useStorage(String(path), {
    enabled: !!path
  });

  const { mutate, isLoading } = useMutation(
    ({
      storageId: newStorageId,
      id: newId,
      password: newPassword
    }: {
      storageId: number;
      id: number;
      password: string | number;
    }) => patchNonMemberStorageBoard(newStorageId, Number(newId), newPassword),
    {
      onSuccess: (data) => {
        setOpen(false);
        setNicknameState(data.nickname);
        setSubjectState(data.subject);
        setEditorContentsState(data.contentJson);
        setEditPasswordPasswordState(password);
      },
      onError: () =>
        setErrorMessage({
          error: true,
          message: '비밀번호가 일치하지 않아요.'
        })
    }
  );

  const handleCloseLoadPasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      loadPassword: {
        ...commonOnBoardingDefault.loadPassword,
        step: 1,
        done: commonOnBoardingDefault.loadPassword.lastStep === 1
      }
    }));

  const handleClose = () => router.back();

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
    handleCloseLoadPasswordTooltip();

    mutate({
      storageId,
      id: Number(id),
      password
    });
  };

  return (
    <Backdrop
      open={open}
      onClose={handleClose}
      centered
      customStyle={{
        backdropFilter: 'blur(5px)'
      }}
    >
      <Box
        customStyle={{
          minWidth: 480,
          padding: 30,
          borderRadius: 16,
          backgroundColor: background.bg
        }}
      >
        <Box
          customStyle={{
            textAlign: 'right'
          }}
        >
          <IconButton>
            <Icon name="CloseOutlined" />
          </IconButton>
        </Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          customStyle={{
            marginTop: 10,
            textAlign: 'center'
          }}
        >
          게시글 수정을 계속하려면
          <br />
          비밀번호를 입력해 주세요.
        </Typography>
        <Tooltip
          open={!done}
          onClose={handleCloseLoadPasswordTooltip}
          content="저장된 비밀번호를 불러왔어요!"
          placement="right"
          fillWrapper
        >
          <TextBar
            type="password"
            label="비밀번호"
            fullWidth
            value={password}
            onChange={handleChange}
            autoFocus
            customStyle={{
              marginTop: 30
            }}
          />
        </Tooltip>
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
            뒤로가기
          </Button>
          <Button
            variant="accent"
            size="big"
            customStyle={{
              flexGrow: 1,
              justifyContent: 'center'
            }}
            onClick={handleClick}
            disabled={!password || isLoading}
          >
            계속하기
          </Button>
        </Flexbox>
      </Box>
    </Backdrop>
  );
}

export default StorageBoardEditAuthDialog;
