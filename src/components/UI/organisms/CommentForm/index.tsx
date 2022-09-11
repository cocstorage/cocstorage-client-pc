import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import styled from '@emotion/styled';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { noticeCommentsParamsState } from '@recoil/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Button, CustomStyle, Flexbox, Icon, TextBar, useTheme } from 'cocstorage-ui';

import useNotice from '@hooks/query/useNotice';
import useNoticeComments from '@hooks/query/useNoticeComments';
import { useStorageBoardData } from '@hooks/query/useStorageBoard';
import useStorageBoardComments from '@hooks/query/useStorageBoardComments';

import validators from '@utils/validators';

import { PostNoticeCommentData, postNonMemberNoticeComment } from '@api/v1/notice-comments';
import {
  PostStorageBoardCommentData,
  postNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

interface CommentFormProps {
  type?: 'storageBoard' | 'notice';
  customStyle?: CustomStyle;
}

function CommentForm({ type = 'storageBoard', customStyle }: CommentFormProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const [noticeCommentsParams, setNoticeCommentsParams] = useRecoilState(noticeCommentsParamsState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [newCustomStyle] = useState({ ...(customStyle as Record<string, string>), flexGrow: 1 });

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const storageBoard = useStorageBoardData(Number(id));

  const { data: notice } = useNotice(Number(id), {
    enabled: type === 'notice'
  });

  const { data: { comments = [], pagination: { perPage = 0 } = {} } = {} } =
    useStorageBoardComments(storageBoard?.storage.id as number, Number(id), params, {
      enabled: type === 'storageBoard' && !!params.page,
      keepPreviousData: true
    });

  const {
    data: {
      comments: noticeComments = [],
      pagination: { perPage: noticeCommentsPerPage = 0 } = {}
    } = {}
  } = useNoticeComments(Number(id), noticeCommentsParams, {
    enabled: type === 'notice' && !!noticeCommentsParams.page,
    keepPreviousData: true
  });

  const { mutate, isLoading } = useMutation(
    (data: PostStorageBoardCommentData) =>
      postNonMemberStorageBoardComment(storageBoard?.storage.id as number, Number(id), data),
    {
      onSuccess: () => {
        setContent('');

        const commentLatestPage = storageBoard?.commentLatestPage || 1;

        if (params.page === commentLatestPage && comments.length + 1 <= perPage) {
          queryClient
            .invalidateQueries(
              queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(
                Number(id),
                params.page || 1
              )
            )
            .then();
        } else {
          let newCommentLatestPage =
            params.page === commentLatestPage && comments.length + 1 > perPage
              ? commentLatestPage + 1
              : commentLatestPage;

          if (!params.page && !commentLatestPage) newCommentLatestPage = 1;

          queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(Number(id)), {
            ...storageBoard,
            commentLatestPage: newCommentLatestPage
          });
          setParams((prevParams) => ({
            ...prevParams,
            page: newCommentLatestPage
          }));
        }
      }
    }
  );

  const { mutate: noticeCommentMutate, isLoading: noticeCommentIsLoading } = useMutation(
    (data: PostNoticeCommentData) => postNonMemberNoticeComment(Number(id), data),
    {
      onSuccess: () => {
        setContent('');

        const noticeCommentLatestPage = notice?.commentLatestPage || 1;

        if (
          noticeCommentsParams.page === noticeCommentLatestPage &&
          noticeComments.length + 1 <= noticeCommentsPerPage
        ) {
          queryClient
            .invalidateQueries(
              queryKeys.noticeComments.noticeCommentsByIdWithPage(
                Number(id),
                noticeCommentsParams.page || 1
              )
            )
            .then();
        } else {
          let newCommentLatestPage =
            noticeCommentsParams.page === noticeCommentLatestPage &&
            noticeComments.length + 1 > noticeCommentsPerPage
              ? noticeCommentLatestPage + 1
              : noticeCommentLatestPage;

          if (!noticeCommentsParams.page && !noticeCommentLatestPage) newCommentLatestPage = 1;

          queryClient.setQueryData(queryKeys.notices.noticeById(Number(id)), {
            ...notice,
            commentLatestPage: newCommentLatestPage
          });
          setNoticeCommentsParams((prevParams) => ({
            ...prevParams,
            page: newCommentLatestPage
          }));
        }
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
      mutate({ nickname, password, content: content.replace(/\n/g, '\n') });
    } else if (type === 'notice') {
      noticeCommentMutate({ nickname, password, content: content.replace(/\n/g, '\n') });
    }
  };

  return (
    <Flexbox gap={20} customStyle={newCustomStyle}>
      <form>
        <Flexbox gap={8} direction="vertical" justifyContent="space-between">
          <TextBar
            size="small"
            value={nickname}
            placeholder="닉네임"
            onChange={handleChange}
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
            autoComplete="current-password"
            customStyle={{
              maxWidth: 173,
              borderColor: box.stroked.normal
            }}
          />
        </Flexbox>
      </form>
      <CommentBar>
        <CommentTextArea
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
          disabled={isLoading || noticeCommentIsLoading || !nickname || !password || !content}
        >
          작성
        </Button>
      </CommentBar>
    </Flexbox>
  );
}

const CommentBar = styled.div`
  flex-grow: 1;
  display: flex;
  max-height: 80px;
  border: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
  background-color: ${({ theme: { palette } }) => palette.background.bg};
  border-radius: 10px;
  overflow: hidden;
`;

const CommentTextArea = styled.textarea`
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

export default CommentForm;
