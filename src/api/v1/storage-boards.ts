import Axios from '@library/axios';

import { StorageBoard } from '@dto/storage-boards';
import { Pagination } from '@dto/common';

const BASE_PATH = '/storages';

export async function fetchPopularStorageBoards() {
  const { data } = await Axios.get<StorageBoard[]>(`${BASE_PATH}/boards/popular`);

  return data;
}

export async function fetchLatestStorageBoards() {
  const { data } = await Axios.get<StorageBoard[]>(`${BASE_PATH}/boards/latest`);

  return data;
}

export async function fetchStorageBoards(id: number | string, params?: FetchStorageBoardsParams) {
  const { data } = await Axios.get<FetchStorageBoardsResponse>(`${BASE_PATH}/${id}/boards`, {
    params
  });

  return data;
}

export interface FetchStorageBoardsParams {
  subject?: string | null;
  content?: string | null;
  nickname?: string | null;
  page?: number;
  per?: number;
  orderBy?: string;
}

export interface FetchStorageBoardsResponse {
  boards: StorageBoard[];
  pagination: Pagination;
}
