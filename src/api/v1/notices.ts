import { Pagination } from '@dto/common';
import { Notice } from '@dto/notices';
import Axios from '@library/axios';

const BASE_PATH = '/notices';

export async function fetchIndexNotice() {
  const { data } = await Axios.get<FetchNoticesResponse>(BASE_PATH, {
    params: {
      per: 1,
      orderBy: 'latest'
    }
  });

  return data;
}

export async function fetchNotices(params?: FetchNoticesParams) {
  const { data } = await Axios.get<FetchNoticesResponse>(BASE_PATH, {
    params
  });

  return data;
}

export interface FetchNoticesResponse {
  notices: Notice[];
  pagination: Pagination;
}

export interface FetchNoticesParams {
  page?: number;
  per?: number;
  orderBy?: string;
}
