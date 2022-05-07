import Axios from '@library/axios';

import { StorageBoard } from '@dto/storage-boards';

const BASE_PATH = '/storages/boards';

export async function fetchPopularStorageBoards() {
  const response = await Axios.get<StorageBoard[]>(`${BASE_PATH}/popular`);

  if (response) return response.data;

  return [];
}

export async function fetchLatestStorageBoards() {
  const response = await Axios.get<StorageBoard[]>(`${BASE_PATH}/latest`);

  if (response) return response.data;

  return [];
}
