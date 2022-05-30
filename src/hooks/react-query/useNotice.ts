import { UseQueryOptions, useQuery } from 'react-query';

import { Notice } from '@dto/notices';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

export default function useNotice(
  id: number,
  options?: Omit<UseQueryOptions<Notice>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.notices.noticeById(Number(id)), () => fetchNotice(id), options);
}
