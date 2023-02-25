import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { commonOnBoardingDefault, commonOnBoardingState } from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import {
  storageBoardsPostDialogOpenState,
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

import {
  Button,
  Dialog,
  Flexbox,
  Icon,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

import validators from '@utils/validators';

import { PutStorageBoardData, putNonMemberStorageBoard } from '@api/v1/storage-boards';

function StorageBoardsPostDialog() {
  const router = useRouter();
  const { query } = router;

  const {
    theme: {
      palette: { secondary }
    }
  } = useTheme();

  const [open, setOpenState] = useRecoilState(storageBoardsPostDialogOpenState);
  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const [{ password: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const subject = useRecoilValue(storageBoardsPostSubjectState);
  const draftId = useRecoilValue(storageBoardsPostDraftIdState);
  const editorContents = useRecoilValue(storageBoardsPostEditorContentsState);
  const resetDraftIdState = useResetRecoilState(storageBoardsPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardsPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardsPostEditorContentsState);

  const [errorMessage, setErrorMessage] = useState({
    nickname: {
      error: false,
      message: ''
    },
    password: {
      error: false,
      message: ''
    }
  });

  const { data: { id = 0 } = {} } = useStorage(String(query.path), {
    enabled: !!query.path
  });

  const { mutate, isLoading } = useMutation(
    ({
      storageId,
      id: newDraftId,
      data
    }: {
      storageId: number;
      id: number;
      data: PutStorageBoardData;
    }) => putNonMemberStorageBoard(storageId, newDraftId, data),
    {
      onSettled: () => {
        setOpenState(false);
      },
      onSuccess: ({ id: storageBoardId }) => {
        setOpenState(false);
        router.replace(`/storages/${query.path}/${storageBoardId}`).then(() => {
          resetDraftIdState();
          resetSubjectState();
          resetEditorContentsState();
        });
      }
    }
  );

  const handleClose = () => setOpenState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'password') {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: {
          error: false,
          message: ''
        }
      }));
      setMyPasswordState(event.currentTarget.value);
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        nickname: {
          error: false,
          message: ''
        }
      }));
      setMyNicknameState(event.currentTarget.value);
    }
  };

  const handleClick = () => {
    handleClosePasswordTooltip();

    if (!validators.nickname(myNickname)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        nickname: {
          error: true,
          message:
            '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
        }
      }));
      return;
    }
    if (!validators.password(myPassword)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        password: {
          error: true,
          message: '7자 이상으로 입력해 주세요!'
        }
      }));
      return;
    }

    mutate({
      storageId: id,
      id: draftId,
      data: {
        nickname: myNickname,
        password: myPassword,
        subject,
        content_json: JSON.stringify(editorContents),
        description: editorContents
          .map(({ children }) =>
            children.filter(({ tag }) => tag === '#text').map(({ content }) => content)
          )
          .filter((contents) => contents.length)
          .join(' ')
      }
    });
  };

  const handleClosePasswordTooltip = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      password: {
        ...commonOnBoardingDefault.password,
        step: 1,
        done: commonOnBoardingDefault.password.lastStep === 1
      }
    }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      customStyle={{
        maxWidth: 475,
        padding: '40px 30px'
      }}
    >
      <Flexbox direction="vertical" gap={8}>
        <Typography variant="h3" fontWeight="bold">
          닉네임
        </Typography>
        <TextBar onChange={handleChange} value={myNickname} fullWidth placeholder="닉네임" />
        {errorMessage.nickname.error && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: errorMessage.nickname.message
            }}
            color={secondary.red.main}
            customStyle={{ marginTop: 10 }}
          />
        )}
      </Flexbox>
      <Flexbox
        direction="vertical"
        gap={8}
        customStyle={{
          marginTop: 16
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          비밀번호
        </Typography>
        <Tooltip
          open={!done}
          onClose={handleClosePasswordTooltip}
          placement="top"
          content="비밀번호를 랜덤하게 생성했어요!"
          fillWrapper
        >
          <TextBar
            type="password"
            onChange={handleChange}
            value={myPassword}
            fullWidth
            placeholder="비밀번호"
          />
        </Tooltip>
        {errorMessage.password.error && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: errorMessage.password.message
            }}
            color={secondary.red.main}
            customStyle={{ marginTop: 10 }}
          />
        )}
      </Flexbox>
      <Flexbox
        gap={8}
        justifyContent="flex-end"
        customStyle={{
          marginTop: 20
        }}
      >
        <Button onClick={handleClose} disabled={isLoading}>
          취소
        </Button>
        <Button
          variant="accent"
          startIcon={<Icon name="SendFilled" />}
          onClick={handleClick}
          disabled={isLoading}
        >
          완료
        </Button>
      </Flexbox>
    </Dialog>
  );
}

export default StorageBoardsPostDialog;
