import { AxiosRequestConfig } from 'axios';
import axios from '..';

export default function fetchLatestStorageBoards() {
  const config: AxiosRequestConfig = {
    url: '/storages/boards/latest',
    method: 'GET'
  };
  return axios(true)(config);
}
