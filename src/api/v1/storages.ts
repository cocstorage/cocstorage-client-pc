import Axios from '@library/axios';

import { Storage } from '@dto/storages';
import { Pagination } from '@dto/common';

const BASE_PATH = '/storages';

export async function fetchStorages() {
  const { data } = await Axios.get<FetchStoragesResponse>(BASE_PATH, {
    params: {
      page: 1,
      per: 180,
      type: 'normal'
    }
  });

  return data;
}

export async function fetchStorage(id: number | string) {
  const { data } = await Axios.get<Storage>(`${BASE_PATH}/${id}`);

  return data;
}

export interface FetchStoragesResponse {
  storages: Storage[];
  pagination: Pagination;
}
