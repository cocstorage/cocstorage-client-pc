import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import styled from '@emotion/styled';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { myHasSavedPasswordState, myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

import { Box, Button, Dialog, Flexbox, Icon, TextBar, Typography, useTheme } from 'cocstorage-ui';

import { useStorageBoardData } from '@hooks/query/useStorageBoard';

import validators from '@utils/validators';

import {
  PostNoticeCommentReplyData,
  postNonMemberNoticeCommentReply
} from '@api/v1/notice-comment-replies';
import {
  PostStorageBoardCommentReplyData,
  postNonMemberStorageBoardCommentReply
} from '@api/v1/storage-board-comment-replies';

import queryKeys from '@constants/queryKeys';

interface ReplyFormProps {
  type?: 'storageBoard' | 'notice';
  commentId: number;
}

function ReplyForm({ type = 'storageBoard', commentId }: ReplyFormProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const [myHasSavedPassword, setMyHasSavedPasswordState] = useRecoilState(myHasSavedPasswordState);
  const params = useRecoilValue(storageBoardCommentsParamsState);
  const noticeCommentsParams = useRecoilValue(noticeCommentsParamsState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [nickname, setNickname] = useState(myNickname);
  const [password, setPassword] = useState(myPassword);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { storage: { id: storageId = 0 } = {} } = useStorageBoardData(Number(id)) || {};

  const { mutate, isLoading } = useMutation(
    (data: PostStorageBoardCommentReplyData) =>
      postNonMemberStorageBoardCommentReply(storageId, Number(id), commentId, data),
    {
      onSettled: () => {
        if (!myHasSavedPassword && !myPassword) {
          setOpen(true);
        }
      },
      onSuccess: () => {
        setContent('');

        return queryClient.invalidateQueries(
          queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(
            Number(id),
            params.page || 1
          )
        );
      }
    }
  );

  const { mutate: noticeCommentReplyMutate, isLoading: noticeCommentReplyIsLoading } = useMutation(
    (data: PostNoticeCommentReplyData) =>
      postNonMemberNoticeCommentReply(Number(id), commentId, data),
    {
      onSettled: () => {
        if (!myHasSavedPassword && !myPassword) {
          setOpen(true);
        }
      },
      onSuccess: () => {
        setContent('');

        return queryClient.invalidateQueries(
          queryKeys.noticeComments.noticeCommentsByIdWithPage(
            Number(id),
            noticeCommentsParams.page || 1
          )
        );
      }
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'password') {
      setPassword(event.currentTarget.value);
    } else {
      setNickname(event.currentTarget.value);
    }
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleClick = () => {
    if (!validators.nickname(nickname)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '닉네임이 올바르지 않아요',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      return;
    }
    if (!validators.password(password)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '비밀번호가 올바르지 않아요.',
        message: '7자 이상으로 입력해 주세요!'
      });
      return;
    }

    if (type === 'storageBoard') {
      mutate({ nickname, password, content });
    } else if (type === 'notice') {
      noticeCommentReplyMutate({ nickname, password, content });
    }
  };

  const handleBlurNicknameTextBar = () => setMyNicknameState(nickname);
  const handleBlurPasswordTextBar = () => {
    if (myPassword) setMyPasswordState(password);
  };

  const handleClosePasswordSaveDialog = () => {
    setMyHasSavedPasswordState(true);
    setOpen(false);
  };

  const handleClickPasswordSaveConfirm = () => {
    setMyHasSavedPasswordState(true);
    setMyPasswordState(password);
    setOpen(false);
  };

  return (
    <>
      <Flexbox
        gap={20}
        customStyle={{
          flexGrow: 1
        }}
      >
        {content && (
          <form>
            <Flexbox gap={8} direction="vertical" justifyContent="space-between">
              <TextBar
                size="small"
                value={nickname}
                placeholder="닉네임"
                onChange={handleChange}
                onBlur={handleBlurNicknameTextBar}
                autoComplete="username"
                customStyle={{
                  maxWidth: 173,
                  borderColor: box.stroked.normal
                }}
              />
              <TextBar
                type="password"
                size="small"
                placeholder="비밀번호"
                value={password}
                onChange={handleChange}
                onBlur={handleBlurPasswordTextBar}
                autoComplete="current-password"
                customStyle={{
                  maxWidth: 173,
                  borderColor: box.stroked.normal
                }}
              />
            </Flexbox>
          </form>
        )}
        <ReplyBar>
          <ReplyTextArea
            onChange={handleChangeContent}
            value={content}
            placeholder="내용을 입력해주세요."
          />
          <Button
            variant="accent"
            startIcon={<Icon name="SendFilled" width={18} height={18} />}
            customStyle={{
              margin: '17px 12px 17px 0'
            }}
            onClick={handleClick}
            disabled={
              isLoading || noticeCommentReplyIsLoading || !nickname || !password || !content
            }
          >
            작성
          </Button>
        </ReplyBar>
      </Flexbox>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClosePasswordSaveDialog}
        customStyle={{
          maxWidth: 320
        }}
      >
        <Box customStyle={{ padding: 16 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            customStyle={{ padding: '30px 0', textAlign: 'center' }}
          >
            비밀번호를 저장하시겠어요?
          </Typography>
          <Flexbox gap={8} customStyle={{ marginTop: 20 }}>
            <Button
              fullWidth
              onClick={handleClosePasswordSaveDialog}
              customStyle={{ flex: 1, justifyContent: 'center' }}
            >
              안할래요
            </Button>
            <Button
              fullWidth
              variant="accent"
              onClick={handleClickPasswordSaveConfirm}
              customStyle={{ flex: 1, justifyContent: 'center' }}
            >
              저장할게요
            </Button>
          </Flexbox>
        </Box>
      </Dialog>
    </>
  );
}

const ReplyBar = styled.div`
  flex-grow: 1;
  display: flex;
  max-height: 80px;
  border: 1px solid
    ${({
      theme: {
        palette: { box }
      }
    }) => box.stroked.normal};
  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};
  border-radius: 10px;
  overflow: hidden;
`;

const ReplyTextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px;
  border: none;
  resize: none;
  outline: 0;
  font-size: 14px;
  line-height: 18px;
  background-color: inherit;
  color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].main};

  &::placeholder {
    color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text1};
  }
`;

export default ReplyForm;
