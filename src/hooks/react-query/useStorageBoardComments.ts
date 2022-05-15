import { UseQueryOptions, useQuery } from 'react-query';

import {
  FetchStorageBoardCommentsParams,
  FetchStorageBoardCommentsResponse,
  fetchStorageBoardComments
} from '@api/v1/storage-board-comments';

import queryKeys from '@constants/react-query';

export default function useStorageBoardComments(
  storageId: number,
  id: number,
  params: FetchStorageBoardCommentsParams,
  options?: Omit<UseQueryOptions<FetchStorageBoardCommentsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoardComments.storageBoardCommentsByIdWithParams(id, params),
    () => fetchStorageBoardComments(storageId, id, params),
    options
  );
}
