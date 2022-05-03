import { AxiosRequestConfig } from 'axios';
import Axios from '@library/axios';

import { Notice } from '@dto/notices';
import { Pagination } from '@dto/common';

const BASE_PATH = '/notices';

export async function fetchNotices(config?: AxiosRequestConfig) {
  const response = await Axios.get<{ notices: Notice[]; pagination: Pagination }>(
    BASE_PATH,
    config
  );

  if (response) return response.data;

  return {
    notices: [],
    pagination: {}
  };
}
