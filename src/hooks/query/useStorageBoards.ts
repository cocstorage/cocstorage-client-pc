import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import {
  FetchStorageBoardsParams,
  FetchStorageBoardsResponse,
  fetchStorageBoards
} from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

export default function useStorageBoards(
  pathOrStorageId: string | number,
  params: FetchStorageBoardsParams,
  options?: Omit<UseQueryOptions<FetchStorageBoardsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoards.storageBoardsByIdWithParams(pathOrStorageId, params),
    () => fetchStorageBoards(pathOrStorageId, params),
    options
  );
}
