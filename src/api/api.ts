import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import store from '../store';

type BaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

export const BASE_URL = 'https://gym.futurefocusadvisor.in/api/v1';
// export const BASE_URL = 'http://192.168.1.43:8080/api/v1';

export const getAxiosInstance = async () => {
  const {authReducer} = store.getState();
  try {
  } catch (error) {
  } finally {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });

    instance.interceptors.request.use(
      function (config) {
        if (authReducer.token) {
          config.headers['Authorization'] = 'Bearer ' + authReducer.token;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response =>
        new Promise((resolve, reject) => {
          // console.log('RESPONSE=====', response);
          resolve(response);
        }),
      async error => {
        console.log('AXIOS ERROR===', error.response);
        if (error.response) {
          return new Promise((resolve, reject) => {
            reject(error.response.data);
          });
        }
      },
    );

    return instance;
  }
};

export const getAxiosFileInstance = async () => {
  const {authReducer} = store.getState();
  try {
  } catch (error) {
  } finally {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 5000,
    });

    instance.interceptors.request.use(
      function (config) {
        if (authReducer.token) {
          config.headers['Authorization'] = 'Bearer ' + authReducer.token;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response =>
        new Promise((resolve, reject) => {
          // console.log('RESPONSE=====', response);
          resolve(response);
        }),
      async error => {
        console.log('AXIOS ERROR===', error.response.data);
        if (error.response) {
          return new Promise((resolve, reject) => {
            reject(error.response.data);
          });
        }
      },
    );

    return instance;
  }
};

export const axiosBaseQuery =
  () =>
  async ({url, method, data, params, headers}: BaseQueryArgs) => {
    try {
      const {authReducer} = store.getState();
      const token = authReducer.token;
      const result: any = await axios({
        url: BASE_URL + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Bearer Token here
        },
        timeout: 5000,
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || 'An error occurred',
        },
      };
    }
  };
