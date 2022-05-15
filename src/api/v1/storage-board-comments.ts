import { Pagination } from '@dto/common';
import { StorageBoardComment } from '@dto/storage-board-comments';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function fetchStorageBoardComments(
  path: number | string,
  id: number | string,
  params?: FetchStorageBoardCommentsParams
) {
  const { data } = await Axios.get<FetchStorageBoardCommentsResponse>(
    `${BASE_PATH}/${path}/boards/${id}/comments`,
    {
      params
    }
  );

  return data;
}

export async function postNonMemberStorageBoardComment(
  path: number | string,
  id: number | string,
  data: PostStorageBoardCommentData
) {
  const { data: response } = await Axios.post<StorageBoardComment, PostStorageBoardCommentData>(
    `${BASE_PATH}/${path}/boards/${id}/comments/non-members`,
    data
  );

  return response;
}

export interface FetchStorageBoardCommentsParams {
  subject?: string | null;
  content?: string | null;
  nickname?: string | null;
  page?: number;
  per?: number;
  orderBy?: string;
}

export interface FetchStorageBoardCommentsResponse {
  comments: StorageBoardComment[];
  pagination: Pagination;
}

export interface PostStorageBoardCommentData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}
