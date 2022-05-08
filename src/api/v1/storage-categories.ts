import { AxiosRequestConfig } from 'axios';
import Axios from '@library/axios';

import { StorageCategory } from '@dto/storage-category';

const BASE_PATH = '/storage-categories';

export async function fetchStorageCategories(config?: AxiosRequestConfig) {
  const { data } = await Axios.get<{ categories: StorageCategory[] }>(BASE_PATH, config);

  return data;
}
