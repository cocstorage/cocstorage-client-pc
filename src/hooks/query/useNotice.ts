import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { Notice } from '@dto/notices';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

export default function useNotice(
  id: number,
  options?: Omit<UseQueryOptions<Notice>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.notices.noticeById(Number(id)), () => fetchNotice(id), options);
}
