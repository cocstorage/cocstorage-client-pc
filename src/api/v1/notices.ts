import { AxiosRequestConfig } from 'axios';
import Axios from '@library/axios';

import { Notice } from '@dto/notices';
import { Pagination } from '@dto/common';

const BASE_PATH = '/notices';

export async function fetchNotices(config?: AxiosRequestConfig) {
  const { data } = await Axios.get<FetchNoticesResponse>(BASE_PATH, config);

  return data;
}

export interface FetchNoticesResponse {
  notices: Notice[];
  pagination: Pagination;
}
