import { UseQueryOptions, useQuery } from 'react-query';

import {
  FetchStorageBoardsParams,
  FetchStorageBoardsResponse,
  fetchStorageBoards
} from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

export default function useStorageBoards(
  pathOrStorageId: string | number,
  params: FetchStorageBoardsParams,
  options?: Omit<UseQueryOptions<FetchStorageBoardsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoards.storageBoardsByIdWithPage(pathOrStorageId, params.page || 1),
    () => fetchStorageBoards(pathOrStorageId, params),
    options
  );
}
