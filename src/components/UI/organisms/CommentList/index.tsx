import { useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import Comment from '@components/UI/organisms/Comment';

import { useStorageBoardData } from '@hooks/react-query/useStorageBoard';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

interface CommentListProps {
  id: number;
}

function CommentList({ id }: CommentListProps) {
  const {
    theme: { palette }
  } = useTheme();
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);

  const isUpdatedCommentPageRef = useRef<boolean>(false);

  const {
    storage: { id: storageId = 0 } = {},
    commentTotalCount = 0,
    commentLatestPage
  } = useStorageBoardData(id) || {};

  const { data: { comments = [] } = {} } = useStorageBoardComments(storageId, id, params, {
    enabled: params.page !== 0,
    keepPreviousData: true
  });

  useEffect(() => {
    if (!isUpdatedCommentPageRef.current && commentLatestPage) {
      isUpdatedCommentPageRef.current = true;

      setParams((prevParams) => ({
        ...prevParams,
        page: commentLatestPage
      }));
    }
  }, [setParams, commentLatestPage]);

  useEffect(() => {
    return () => {
      isUpdatedCommentPageRef.current = false;
    };
  }, [commentLatestPage]);

  return (
    <>
      <Flexbox gap={4}>
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
            댓글
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={700}
            lineHeight="20px"
            customStyle={{
              color: palette.primary.main
            }}
          >
            {commentTotalCount}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {comments.map((comment) => (
          <Comment
            key={`comment-${comment.id}`}
            storageId={storageId as number}
            id={id}
            comment={comment}
          />
        ))}
      </Flexbox>
    </>
  );
}

export default CommentList;
