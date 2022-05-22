import { Pagination } from '@dto/common';
import { NoticeComment } from '@dto/notice-comments';
import Axios from '@library/axios';

const BASE_PATH = '/admin/notices';

export async function fetchNoticeComments(id: number, params?: FetchNoticeCommentsParams) {
  const { data } = await Axios.get<FetchNoticeCommentsResponse>(`${BASE_PATH}/${id}/comments`, {
    params
  });

  return data;
}

export interface FetchNoticeCommentsParams {
  page?: number;
  per?: number;
  orderBy?: string;
}

export interface FetchNoticeCommentsResponse {
  comments: NoticeComment[];
  pagination: Pagination;
}
