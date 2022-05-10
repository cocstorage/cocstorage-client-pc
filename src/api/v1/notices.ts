import { AxiosRequestConfig } from 'axios';

import { Pagination } from '@dto/common';
import { Notice } from '@dto/notices';
import Axios from '@library/axios';

const BASE_PATH = '/notices';

export async function fetchNotices(config?: AxiosRequestConfig) {
  const { data } = await Axios.get<FetchNoticesResponse>(BASE_PATH, config);

  return data;
}

export interface FetchNoticesResponse {
  notices: Notice[];
  pagination: Pagination;
}
