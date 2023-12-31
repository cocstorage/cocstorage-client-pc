import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Box,
  Button,
  CustomStyle,
  Flexbox,
  Spotlight,
  TextBar,
  Tooltip,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { PostNoticeCommentData, postNonMemberNoticeComment } from '@api/v1/notice-comments';
import {
  PostStorageBoardCommentData,
  postNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';
import queryKeys from '@constants/queryKeys';
import useNotice from '@hooks/query/useNotice';
import useNoticeComments from '@hooks/query/useNoticeComments';
import { useStorageBoardData } from '@hooks/query/useStorageBoard';
import useStorageBoardComments from '@hooks/query/useStorageBoardComments';
import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import { myNicknameState, myPasswordState } from '@recoil/pages/my/atoms';
import { noticeCommentsParamsState } from '@recoil/pages/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/pages/storageBoard/atoms';
import validators from '@utils/validators';

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
  const [myNickname, setMyNicknameState] = useRecoilState(myNicknameState);
  const [myPassword, setMyPasswordState] = useRecoilState(myPasswordState);
  const [
    {
      theme: { done: themeDone = false } = {},
      comment: { done: commentDone = false } = {},
      password: { done = false } = {}
    },
    setCommonOnBoardingState
  ] = useRecoilState(commonOnBoardingState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const [newCustomStyle] = useState({ ...(customStyle as Record<string, string>), flexGrow: 1 });

  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [observerTriggered, setObserverTriggered] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef<IntersectionObserverCallback>(async ([entry], observer) => {
    try {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        setObserverTriggered(true);
        observer.observe(entry.target);
      } else {
        setObserverTriggered(false);
      }
    } catch {
      setObserverTriggered(true);
    }
  }).current;

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
      mutate({ nickname: myNickname, password: myPassword, content: content.replace(/\n/g, '\n') });
    } else if (type === 'notice') {
      noticeCommentMutate({
        nickname: myNickname,
        password: myPassword,
        content: content.replace(/\n/g, '\n')
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      comment: {
        ...commonOnBoardingDefault.comment,
        step: 1,
        done: commonOnBoardingDefault.comment.lastStep === 1
      }
    }));
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

  useEffect(() => {
    let observer: IntersectionObserver;
    try {
      if (targetRef.current) {
        observer = new IntersectionObserver(onIntersectRef, { threshold: 1 });
        observer.observe(targetRef.current);
        return () => observer.disconnect();
      }
    } catch {
      return () => {
        if (observer) observer.disconnect();
      };
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [onIntersectRef]);

  useEffect(() => {
    if (observerTriggered && themeDone && !commentDone) {
      if (!targetRef.current) return;

      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [themeDone, commentDone, observerTriggered]);

  return (
    <Box customStyle={newCustomStyle}>
      <Flexbox ref={targetRef} gap={20}>
        {content && (
          <form>
            <Flexbox gap={8} direction="vertical" justifyContent="space-between">
              <TextBar
                value={myNickname}
                placeholder="닉네임"
                onChange={handleChange}
                autoComplete="username"
                customStyle={{
                  maxWidth: 173,
                  borderColor: box.stroked.normal
                }}
              />
              <Tooltip
                open={!done}
                onClose={handleClosePasswordTooltip}
                placement="top"
                content="비밀번호를 랜덤하게 생성했어요!"
              >
                <TextBar
                  type="password"
                  placeholder="비밀번호"
                  value={myPassword}
                  onChange={handleChange}
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
        <CommentBar>
          <CommentTextArea
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
            disabled={isLoading || noticeCommentIsLoading || !myNickname || !myPassword || !content}
          >
            등록
          </Button>
        </CommentBar>
      </Flexbox>
      <Spotlight
        open={open}
        onClose={handleClose}
        targetRef={targetRef}
        round={10}
        tooltip={{
          content: '로그인하지 않아도 댓글을 남길 수 있어요!',
          placement: 'top'
        }}
      />
    </Box>
  );
}

const CommentBar = styled.div`
  flex-grow: 1;
  display: flex;
  width: fit-content;
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

const CommentTextArea = styled.textarea`
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

export default CommentForm;
