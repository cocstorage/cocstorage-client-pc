import axios, { AxiosInstance } from 'axios';

const Axios = (() => {
  let axiosInstance: AxiosInstance;

  function init(): AxiosInstance {
    axios.defaults.baseURL = process.env.API_BASE_URL;
    axios.defaults.headers.common.Authorization =
      typeof window !== 'undefined' && (window.localStorage.getItem('coc-jwt') || '');
    axios.defaults.headers.common['X-Api-Key'] = process.env.X_API_KEY || '';

    return axios;
  }

  return {
    getInstance() {
      if (axiosInstance) {
        return axiosInstance;
      }
      axiosInstance = init();
      return axiosInstance;
    },
    setAuthorization(jwt?: string) {
      if (axiosInstance && jwt) {
        axiosInstance.defaults.headers.common.Authorization = jwt;
      } else if (axiosInstance && !jwt) {
        delete axiosInstance.defaults.headers.common.Authorization;
      }
    }
  };
})();

export default Axios;
