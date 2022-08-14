import { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './axios';

export interface FetchAPI {
    (url: string, init?: Request & AxiosRequestConfig): Promise<Response>;
}

// ? usefull if we will generate api for typescript-fetch
export const portableFetch: FetchAPI = (url: string, init?: Request & AxiosRequestConfig) => {
    const config: AxiosRequestConfig = {
        url,
        data: init?.body,
        ...init,
    };

    return axiosInstance.request(config).then(
        (res) =>
            ({
                ...res,
                json: () => res.data as Record<string, unknown>,
            } as unknown as Response),
    );
};
