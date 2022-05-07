import { AxiosRequestConfig } from 'axios';
import Axios from '@library/axios';

import { Storage } from '@dto/storages';
import { Pagination } from '@dto/common';

const BASE_PATH = '/storages';

export async function fetchStorages(config?: AxiosRequestConfig) {
  const response = await Axios.get<{ storages: Storage[]; pagination: Pagination }>(
    BASE_PATH,
    config
  );

  if (response) return response.data;

  return {
    storages: [],
    pagination: {}
  };
}
