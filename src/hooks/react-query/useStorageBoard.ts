import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { StorageBoard } from '@dto/storage-boards';

import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

export function useStorageBoardData(id: number) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<StorageBoard>(queryKeys.storageBoards.storageBoardById(id));
}

export default function useStorageBoard(
  pathOrStorageId: number | string,
  id: number,
  options?: Omit<UseQueryOptions<StorageBoard>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoards.storageBoardById(id),
    () => fetchStorageBoard(pathOrStorageId, id),
    options
  );
}
