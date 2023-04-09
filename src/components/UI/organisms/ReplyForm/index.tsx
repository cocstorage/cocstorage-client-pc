import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { Button, Flexbox, TextBar, Tooltip, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styled from '@emotion/styled';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';

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
  const [{ password: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const params = useRecoilValue(storageBoardCommentsParamsState);
  const noticeCommentsParams = useRecoilValue(noticeCommentsParamsState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const { storage: { id: storageId = 0 } = {} } = useStorageBoardData(Number(id)) || {};

  const { mutate, isLoading } = useMutation(
    (data: PostStorageBoardCommentReplyData) =>
      postNonMemberStorageBoardCommentReply(storageId, Number(id), commentId, data),
    {
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
      setMyPasswordState(event.currentTarget.value);
    } else {
      setMyNicknameState(event.currentTarget.value);
    }
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleClick = () => {
    if (!validators.nickname(myNickname)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '닉네임이 올바르지 않아요',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      return;
    }
    if (!validators.password(myPassword)) {
      setCommonFeedbackDialogState({
        open: true,
        title: '비밀번호가 올바르지 않아요.',
        message: '7자 이상으로 입력해 주세요!'
      });
      return;
    }

    if (type === 'storageBoard') {
      mutate({ nickname: myNickname, password: myPassword, content });
    } else if (type === 'notice') {
      noticeCommentReplyMutate({ nickname: myNickname, password: myPassword, content });
    }
  };

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      password: {
        ...commonOnBoardingDefault.password,
        step: 1,
        done: commonOnBoardingDefault.password.lastStep === 1
      }
    }));

  const handleBlurNicknameTextBar = () => setMyNicknameState(myNickname);
  const handleBlurPasswordTextBar = () => {
    if (myPassword) setMyPasswordState(myPassword);
  };

  return (
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
              value={myNickname}
              placeholder="닉네임"
              onChange={handleChange}
              onBlur={handleBlurNicknameTextBar}
              autoComplete="username"
              customStyle={{
                maxWidth: 173,
                borderColor: box.stroked.normal
              }}
            />
            <Tooltip
              open={!done}
              onClose={handleClose}
              placement="top"
              content="비밀번호를 랜덤하게 생성했어요!"
            >
              <TextBar
                type="password"
                placeholder="비밀번호"
                value={myPassword}
                onChange={handleChange}
                onBlur={handleBlurPasswordTextBar}
                autoComplete="current-password"
                customStyle={{
                  maxWidth: 173,
                  borderColor: box.stroked.normal
                }}
              />
            </Tooltip>
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
          size="big"
          startIcon={<Icon name="SendFilled" />}
          customStyle={{
            margin: '17px 12px 17px 0'
          }}
          onClick={handleClick}
          disabled={
            isLoading || noticeCommentReplyIsLoading || !myNickname || !myPassword || !content
          }
        >
          등록
        </Button>
      </ReplyBar>
    </Flexbox>
  );
}

const ReplyBar = styled.div`
  flex-grow: 1;
  display: flex;
  height: 84px;
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
  flex: 1;
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
