import { AUTH_HEADER_NAME } from 'api/constants';
import { localConfigService } from 'api/localConfigService';
import { socketService } from 'api/socketService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { handleResponseAndThrowAnErrorIfExists } from 'utils';

axios.defaults.withCredentials = true;

export const requestConfig: AxiosRequestConfig = {
    baseURL: `${process.env.BACKEND_URL}`,
    responseType: 'json',
    withCredentials: true,
};

const axiosInstance = axios.create(requestConfig);

let axiosCredentialInterceptorsId: number;

export const updateLoginConnection = (accessToken: string) => {
    try {
        axiosInstance.interceptors.request.eject(axiosCredentialInterceptorsId);
    } catch (error) {
        console.error('at axios in updateAxiosClientCredential', error);
    }

    socketService.connect(accessToken);

    axiosCredentialInterceptorsId = axiosInstance.interceptors.request.use((config) => {
        config.headers = { ...config.headers, [AUTH_HEADER_NAME]: accessToken };

        return config;
    });
};

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
    const accessToken = res.headers?.[AUTH_HEADER_NAME] ?? res.headers?.[AUTH_HEADER_NAME.toLowerCase()];

    if (accessToken) {
        localConfigService.saveHeader(accessToken).catch(console.error);
        updateLoginConnection(accessToken);
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

export { axiosInstance };
