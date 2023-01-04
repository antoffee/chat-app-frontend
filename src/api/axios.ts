import axios, { AxiosRequestConfig } from 'axios';

import { handleResponseAndThrowAnErrorIfExists } from 'utils';

axios.defaults.withCredentials = true;

export const requestConfig: AxiosRequestConfig = {
    baseURL: `${process.env.BACKEND_URL}`,
    responseType: 'json',
    withCredentials: true,
};

export const axiosInstance = axios.create(requestConfig);

// const addCompress = (config: AxiosRequestConfig) => {
//     config.headers = { ...config.headers, ['Accept-Encoding']: 'qzip' };
// };

// axiosInstance.interceptors.request.use(
//     (config) => {
//         addCompress(config);

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

axiosInstance.interceptors.response.use(handleResponseAndThrowAnErrorIfExists);
