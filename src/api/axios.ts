import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthResponse } from 'types/authResponse';

export const requestConfig: AxiosRequestConfig = {
    baseURL: `${process.env.BACKEND_URL}`,
    responseType: 'json',
    withCredentials: false,
};

export const axiosInstance = axios.create(requestConfig);

const addCompress = (config: AxiosRequestConfig) => {
    config.headers = { ...config.headers, ['Accept-Encoding']: 'qzip' };
};

let axiosCredentialInterceptorsId: number;

export const updateAxiosClientCredential = (accessToken: string) => {
    try {
        axiosInstance.interceptors.request.eject(axiosCredentialInterceptorsId);
    } catch (error) {
        console.error('at axios in updateAxiosClientCredential', error);
    }

    axiosCredentialInterceptorsId = axiosInstance.interceptors.request.use((config) => {
        config.headers = { ...config.headers, ['Authorization']: `Bearer ${accessToken}` };

        return config;
    });
};

axiosInstance.interceptors.request.use(
    (config) => {
        addCompress(config);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (res: AxiosResponse<AuthResponse>) => {
        const { accessToken } = res.data;
        if (accessToken) {
            updateAxiosClientCredential(accessToken);
        }

        return res;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 403) {
            // refresh token
            // const prevReq: AxiosRequestConfig = error.config;
        }

        return error;
    },
);
