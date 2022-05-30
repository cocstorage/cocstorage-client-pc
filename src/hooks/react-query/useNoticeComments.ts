import { UseQueryOptions, useQuery } from 'react-query';

import {
  FetchNoticeCommentsParams,
  FetchNoticeCommentsResponse,
  fetchNoticeComments
} from '@api/v1/notice-comments';

import queryKeys from '@constants/react-query';

export default function useNoticeComments(
  id: number,
  params: FetchNoticeCommentsParams,
  options?: Omit<UseQueryOptions<FetchNoticeCommentsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.noticeComments.noticeCommentsByIdWithPage(id, params.page || 1),
    () => fetchNoticeComments(id, params),
    options
  );
}
