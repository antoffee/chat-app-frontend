import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthResponse } from 'types/authResponse';

import { handleResponseAndThrowAnErrorIfExists } from 'utils';

axios.defaults.withCredentials = true;

export const requestConfig: AxiosRequestConfig = {
    baseURL: `${process.env.BACKEND_URL}`,
    responseType: 'json',
    withCredentials: true,
};

export const axiosInstance = axios.create(requestConfig);

let axiosCredentialInterceptorsId: number;

export const updateAxiosClientCredential = (accessToken: string) => {
    try {
        axiosInstance.interceptors.request.eject(axiosCredentialInterceptorsId);
    } catch (error) {
        console.error('at axios in updateAxiosClientCredential', error);
    }

    axiosCredentialInterceptorsId = axiosInstance.interceptors.request.use((config) => {
        config.headers = { ...config.headers, ['authorization']: accessToken };

        return config;
    });
};

const accessHeader = localStorage.getItem('accessHeader');

if (accessHeader) {
    updateAxiosClientCredential(accessHeader);
}

axiosInstance.interceptors.response.use((res: AxiosResponse<AuthResponse>) => {
    const accessToken = res.headers?.['authorisation'];
    if (accessToken) {
        localStorage.setItem('accessHeader', accessToken);
        updateAxiosClientCredential(accessToken);
    }

    return res;
});

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
