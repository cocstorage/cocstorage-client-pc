import { useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { noticeCommentsParamsState } from '@recoil/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Comment from '@components/UI/organisms/Comment';

import useNotice from '@hooks/react-query/useNotice';
import useNoticeComments from '@hooks/react-query/useNoticeComments';
import { useStorageBoardData } from '@hooks/react-query/useStorageBoard';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

interface CommentListProps {
  type?: 'storageBoard' | 'notice';
  id: number;
}

function CommentList({ type = 'storageBoard', id }: CommentListProps) {
  const {
    theme: { palette }
  } = useTheme();
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const [noticeCommentsParams, setNoticeCommentsParams] = useRecoilState(noticeCommentsParamsState);

  const isUpdatedCommentPageRef = useRef<boolean>(false);

  const {
    storage: { id: storageId = 0 } = {},
    commentTotalCount = 0,
    commentLatestPage
  } = useStorageBoardData(id) || {};

  const {
    data: {
      commentTotalCount: noticeCommentTotalCount = 0,
      commentLatestPage: noticeCommentLatestPage = 0
    } = {}
  } = useNotice(Number(id), {
    enabled: type === 'notice'
  });

  const {
    data: { comments = [], pagination: { totalPages = 0, perPage = 10, currentPage = 1 } = {} } = {}
  } = useStorageBoardComments(storageId, id, params, {
    enabled: type === 'storageBoard' && params.page !== 0,
    keepPreviousData: true
  });

  const {
    data: {
      comments: noticeComments = [],
      pagination: {
        totalPages: noticeCommentsTotalPages = 0,
        perPage: noticeCommentsPerPage = 10,
        currentPage: noticeCommentsCurrentPage = 1
      } = {}
    } = {}
  } = useNoticeComments(id, noticeCommentsParams, {
    enabled: type === 'notice' && noticeCommentsParams.page !== 0,
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    if (type === 'storageBoard') {
      setParams((prevParams) => ({
        ...prevParams,
        page: value
      }));
    } else if (type === 'notice') {
      setNoticeCommentsParams((prevParams) => ({
        ...prevParams,
        page: value
      }));
    }
  };

  useEffect(() => {
    if (type === 'storageBoard' && !isUpdatedCommentPageRef.current && commentLatestPage) {
      isUpdatedCommentPageRef.current = true;

      setParams((prevParams) => ({
        ...prevParams,
        page: commentLatestPage
      }));
    }
  }, [setParams, commentLatestPage, type]);

  useEffect(() => {
    if (type === 'notice' && !isUpdatedCommentPageRef.current && noticeCommentLatestPage) {
      isUpdatedCommentPageRef.current = true;

      setNoticeCommentsParams((prevParams) => ({
        ...prevParams,
        page: noticeCommentLatestPage
      }));
    }
  }, [setNoticeCommentsParams, noticeCommentLatestPage, type]);

  useEffect(() => {
    return () => {
      isUpdatedCommentPageRef.current = false;
    };
  }, [commentLatestPage, noticeCommentLatestPage]);

  if (
    (type === 'storageBoard' && comments.length === 0) ||
    (type === 'notice' && noticeComments.length === 0)
  ) {
    return (
      <Message title="댓글이 없네요!" message="첫 댓글의 주인공이 되어 주실래요?" hideButton />
    );
  }

  return (
    <Flexbox direction="vertical" gap={24}>
      <Flexbox gap={4}>
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography variant="h4" fontWeight="bold">
            댓글
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            customStyle={{
              color: palette.primary.main
            }}
          >
            {(commentTotalCount || noticeCommentTotalCount).toLocaleString()}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {comments.map((comment) => (
          <Comment
            key={`comment-${comment.id}`}
            type={type}
            storageId={storageId}
            id={id}
            comment={comment}
          />
        ))}
        {noticeComments.map((noticeComment) => (
          <Comment
            key={`notice-comment-${noticeComment.id}`}
            type={type}
            storageId={storageId}
            id={id}
            comment={noticeComment}
          />
        ))}
      </Flexbox>
      {type === 'storageBoard' && (
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          onChange={handleChange}
          customStyle={{ margin: 'auto' }}
        />
      )}
      {type === 'notice' && (
        <Pagination
          count={noticeCommentsTotalPages * noticeCommentsPerPage}
          page={noticeCommentsCurrentPage}
          rowPerPage={noticeCommentsPerPage}
          onChange={handleChange}
          customStyle={{ margin: 'auto' }}
        />
      )}
    </Flexbox>
  );
}

export default CommentList;
