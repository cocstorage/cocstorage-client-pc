import { Pagination } from '@dto/common';
import { StorageBoardComment } from '@dto/storage-board-comments';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function fetchStorageBoardComments(
  id: number | string,
  boardId: number | string,
  params?: FetchStorageBoardCommentsParams
) {
  const { data } = await Axios.get<FetchStorageBoardCommentsResponse>(
    `${BASE_PATH}/${id}/boards/${boardId}/comments`,
    {
      params
    }
  );

  return data;
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
