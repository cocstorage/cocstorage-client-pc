import axios from 'axios';

export function axiosInstance(noAuthorization?: boolean) {
  axios.defaults.baseURL = process.env.API_BASE_URL;
  axios.defaults.headers.common.Authorization =
    typeof window !== 'undefined' && (window.localStorage.getItem('coc-jwt') || '');
  axios.defaults.headers.common['X-Api-Key'] = process.env.X_API_KEY || '';

  if (noAuthorization) axios.defaults.headers.common.Authorization = '';

  return axios;
}

export default axiosInstance;
