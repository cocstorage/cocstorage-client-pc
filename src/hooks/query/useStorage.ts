import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import { Storage } from '@dto/storages';

export function useStorageData(pathOrStorageId: number | string) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<Storage>(queryKeys.storages.storageById(pathOrStorageId));
}

export default function useStorage(
  pathOrStorageId: number | string,
  options?: Omit<UseQueryOptions<Storage>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    queryKeys.storages.storageById(pathOrStorageId),
    () => fetchStorage(pathOrStorageId),
    options
  );
}
