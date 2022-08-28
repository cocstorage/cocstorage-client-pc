import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import {
  FetchStorageBoardCommentsParams,
  FetchStorageBoardCommentsResponse,
  fetchStorageBoardComments
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/queryKeys';

export default function useStorageBoardComments(
  storageId: number,
  id: number,
  params: FetchStorageBoardCommentsParams,
  options?: Omit<UseQueryOptions<FetchStorageBoardCommentsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithPage(id, params.page || 1),
    () => fetchStorageBoardComments(storageId, id, params),
    options
  );
}
