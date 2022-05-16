import { Pagination } from '@dto/common';
import { StorageBoard } from '@dto/storage-boards';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function fetchPopularStorageBoards() {
  const { data } = await Axios.get<FetchStorageBoardsResponse>(`${BASE_PATH}/boards/popular`);

  return data;
}

export async function fetchWorstStorageBoards() {
  const { data } = await Axios.get<FetchStorageBoardsResponse>(`${BASE_PATH}/boards/worst`);

  return data;
}

export async function fetchLatestStorageBoards() {
  const { data } = await Axios.get<FetchStorageBoardsResponse>(`${BASE_PATH}/boards/latest`);

  return data;
}

export async function fetchStorageBoards(
  pathOrStorageId: number | string,
  params?: FetchStorageBoardsParams
) {
  const { data } = await Axios.get<FetchStorageBoardsResponse>(
    `${BASE_PATH}/${pathOrStorageId}/boards`,
    {
      params
    }
  );

  return data;
}

export async function fetchStorageBoard(pathOrStorageId: number | string, id: number) {
  const { data } = await Axios.get<StorageBoard>(`${BASE_PATH}/${pathOrStorageId}/boards/${id}`);

  return data;
}

export async function putStorageBoardViewCount(storageId: number | string, id: number) {
  const { data } = await Axios.put<StorageBoard, null>(
    `${BASE_PATH}/${storageId}/boards/${id}/view-count`
  );

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
