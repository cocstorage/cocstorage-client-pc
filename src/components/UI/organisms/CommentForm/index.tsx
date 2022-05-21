import { ChangeEvent, useState } from 'react';

import { useMutation, useQueryClient } from 'react-query';

import styled from '@emotion/styled';

import { useRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Button, Flexbox, Icon, TextBar, useTheme } from 'cocstorage-ui';

import MessageDialog from '@components/UI/organisms/MessageDialog';

import { useStorageBoardData } from '@hooks/react-query/useStorageBoard';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

import {
  PostStorageBoardCommentData,
  postNonMemberStorageBoardComment
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/react-query';
import validators from '@constants/validators';

interface CommentFormProps {
  id: number;
}

function CommentForm({ id }: CommentFormProps) {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);

  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '알 수 없는 오류가 발생했어요.',
    code: '',
    message: '문제가 지속된다면 관리자에게 문의해 주세요!'
  });

  const queryClient = useQueryClient();

  const storageBoard = useStorageBoardData(id);

  const { data: { comments = [], pagination: { perPage = 0 } = {} } = {} } =
    useStorageBoardComments(storageBoard?.storage.id as number, id, params, {
      enabled: params.page !== 0,
      keepPreviousData: true
    });

  const { mutate, isLoading } = useMutation(
    (data: PostStorageBoardCommentData) =>
      postNonMemberStorageBoardComment(storageBoard?.storage.id as number, id, data),
    {
      onSuccess: () => {
        setContent('');

        const commentLatestPage = storageBoard?.commentLatestPage || 0;

        if (params.page === commentLatestPage && comments.length + 1 <= perPage) {
          queryClient
            .invalidateQueries(
              queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(id, params.page)
            )
            .then();
        } else {
          let newCommentLatestPage =
            params.page === commentLatestPage && comments.length + 1 > perPage
              ? commentLatestPage + 1
              : commentLatestPage;

          if (!params.page && !commentLatestPage) newCommentLatestPage = 1;

          queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(id), {
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
      setErrorMessage({
        title: '닉네임이 올바르지 않아요',
        code: '',
        message:
          '한글 또는 영문 대소문자 2자 이상 10자 이하로 입력해 주세요.<br />특수문자는 포함할 수 없어요!'
      });
      setOpen(true);
      return;
    }
    if (!validators.password(password)) {
      setErrorMessage({
        title: '비밀번호가 올바르지 않아요.',
        code: '',
        message: '7자 이상으로 입력해 주세요!'
      });
      setOpen(true);
      return;
    }

    mutate({ nickname, password, content: content.replace(/\n/g, '\n') });
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Flexbox
        gap={20}
        customStyle={{
          flexGrow: 1
        }}
      >
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
            disabled={isLoading || !nickname || !password || !content}
          >
            작성
          </Button>
        </CommentBar>
      </Flexbox>
      <MessageDialog open={open} {...errorMessage} onClose={handleClose} />
    </>
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
  color: ${({ theme: { type, palette } }) => palette.text[type].main};

  &::placeholder {
    color: ${({ theme: { type, palette } }) => palette.text[type].text1};
  }
`;

export default CommentForm;
