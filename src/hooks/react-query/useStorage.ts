import { UseQueryOptions, useQuery } from 'react-query';

import { Storage } from '@dto/storages';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

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
