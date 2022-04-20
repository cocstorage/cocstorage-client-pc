import { AxiosRequestConfig } from 'axios';
import Axios from '@library/axios';

export default function fetchLatestStorageBoards() {
  const config: AxiosRequestConfig = {
    url: '/storages/boards/latest',
    method: 'GET'
  };
  return Axios.getInstance()(config);
}
