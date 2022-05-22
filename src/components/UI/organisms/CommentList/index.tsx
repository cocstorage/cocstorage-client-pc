import { useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
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

  const {
    data: { comments = [], pagination: { totalPages = 0, perPage = 10, currentPage = 1 } = {} } = {}
  } = useStorageBoardComments(storageId, id, params, {
    enabled: params.page !== 0,
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

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

  if (comments.length === 0) {
    return (
      <Message title="댓글이 없네요!" message="첫 댓글의 주인공이 되어 주실래요?" hideButton />
    );
  }

  return (
    <Flexbox direction="vertical" gap={24}>
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
          <Comment key={`comment-${comment.id}`} storageId={storageId} id={id} comment={comment} />
        ))}
      </Flexbox>
      <Pagination
        count={totalPages * perPage}
        page={currentPage}
        rowPerPage={perPage}
        onChange={handleChange}
        customStyle={{ margin: 'auto' }}
      />
    </Flexbox>
  );
}

export default CommentList;
