import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import queryKeys from '@constants/queryKeys';
import { StorageBoard } from '@dto/storage-boards';

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
