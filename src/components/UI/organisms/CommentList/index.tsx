import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { noticeCommentsParamsState } from '@recoil/notice/atoms';
import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Box, Flexbox, Icon, Pagination, Typography, useTheme } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';
import Comment from '@components/UI/organisms/Comment';
import CommentSkeleton from '@components/UI/organisms/Comment/CommentSkeleton';

import useNotice from '@hooks/query/useNotice';
import useNoticeComments from '@hooks/query/useNoticeComments';
import { useStorageBoardData } from '@hooks/query/useStorageBoard';
import useStorageBoardComments from '@hooks/query/useStorageBoardComments';

interface CommentListProps {
  type?: 'storageBoard' | 'notice';
}

function CommentList({ type = 'storageBoard' }: CommentListProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      palette: { primary }
    }
  } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);
  const [noticeCommentsParams, setNoticeCommentsParams] = useRecoilState(noticeCommentsParamsState);
  const resetParams = useResetRecoilState(storageBoardCommentsParamsState);
  const resetNoticeCommentsParams = useResetRecoilState(noticeCommentsParamsState);

  const {
    storage: { id: storageId = 0 } = {},
    commentLatestPage = 0,
    commentTotalCount = 0
  } = useStorageBoardData(Number(id)) || {};

  const {
    data: {
      commentTotalCount: noticeCommentTotalCount = 0,
      commentLatestPage: noticeCommentLatestPage = 0
    } = {}
  } = useNotice(Number(id), {
    enabled: type === 'notice' && !!noticeCommentsParams.page
  });

  const {
    data: {
      comments = [],
      pagination: { totalPages = 1, perPage = 10, currentPage = 1 } = {}
    } = {},
    isLoading
  } = useStorageBoardComments(storageId, Number(id), params, {
    enabled: type === 'storageBoard' && !!params.page,
    keepPreviousData: true
  });

  const {
    data: {
      comments: noticeComments = [],
      pagination: {
        totalPages: noticeCommentsTotalPages = 1,
        perPage: noticeCommentsPerPage = 10,
        currentPage: noticeCommentsCurrentPage = 1
      } = {}
    } = {},
    isLoading: isLoadingNoticeComments
  } = useNoticeComments(Number(id), noticeCommentsParams, {
    enabled: type === 'notice' && !!noticeCommentsParams.page,
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
    if (type === 'storageBoard') {
      setParams((prevParams) => ({
        ...prevParams,
        page: commentLatestPage || 1
      }));
    }
  }, [setParams, commentLatestPage, type]);

  useEffect(() => {
    if (type === 'notice') {
      setNoticeCommentsParams((prevParams) => ({
        ...prevParams,
        page: noticeCommentLatestPage || 1
      }));
    }
  }, [setNoticeCommentsParams, noticeCommentLatestPage, type]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  useEffect(() => {
    return () => {
      resetNoticeCommentsParams();
    };
  }, [resetNoticeCommentsParams]);

  if (
    (!isLoading && type === 'storageBoard' && comments.length === 0) ||
    (!isLoadingNoticeComments && type === 'notice' && noticeComments.length === 0)
  ) {
    return (
      <Box component="section">
        <Message title="댓글이 없네요!" message="첫 댓글의 주인공이 되어 주실래요?" hideButton />
      </Box>
    );
  }

  return (
    <Flexbox direction="vertical" gap={24}>
      <Flexbox gap={4} alignment="center">
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography variant="h4" fontWeight="bold">
            댓글
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            customStyle={{
              color: primary.main
            }}
          >
            {(commentTotalCount || noticeCommentTotalCount).toLocaleString()}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {type === 'storageBoard' &&
          isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`comment-skeleton-${index}`} />
          ))}
        {type === 'storageBoard' &&
          !isLoading &&
          comments.map((comment) => (
            <Comment key={`comment-${comment.id}`} type={type} comment={comment} />
          ))}
        {type === 'notice' &&
          isLoadingNoticeComments &&
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={`comment-skeleton-${index}`} />
          ))}
        {type === 'notice' &&
          !isLoadingNoticeComments &&
          noticeComments.map((noticeComment) => (
            <Comment
              key={`notice-comment-${noticeComment.id}`}
              type={type}
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
