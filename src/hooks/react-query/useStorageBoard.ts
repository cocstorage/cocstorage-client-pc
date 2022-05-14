import { UseQueryOptions, useQuery } from 'react-query';

import { StorageBoard } from '@dto/storage-boards';

import { fetchStorageBoard } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

export default function useStorageBoard(
  storageId: number | string,
  id: number | string,
  options?: Omit<UseQueryOptions<StorageBoard>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storageBoards.storageBoardById(id),
    () => fetchStorageBoard(storageId, id),
    options
  );
}
