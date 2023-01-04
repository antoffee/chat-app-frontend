// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/**
 * Chat App Backend - SWAGGER
 * chat app backend
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ApiChatRoomEntityDetailsResponse } from '../models';
import { ApiChatRoomEntityWithMembersResponse } from '../models';
/**
 * ChatApi - axios parameter creator
 * @export
 */
export const ChatApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetRoomDetails: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError(
                    'id',
                    'Required parameter id was null or undefined when calling chatControllerGetRoomDetails.',
                );
            }
            const localVarPath = `/chat/room/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = new URLSearchParams(query).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chatControllerGetSelfRooms: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/chat/self-rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = new URLSearchParams(query).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    };
};

/**
 * ChatApi - functional programming interface
 * @export
 */
export const ChatApiFp = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetRoomDetails(
            id: string,
            options?: AxiosRequestConfig,
        ): Promise<
            (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiChatRoomEntityDetailsResponse>>
        > {
            const localVarAxiosArgs = await ChatApiAxiosParamCreator(configuration).chatControllerGetRoomDetails(
                id,
                options,
            );
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = {
                    ...localVarAxiosArgs.options,
                    url: basePath + localVarAxiosArgs.url,
                };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetSelfRooms(
            options?: AxiosRequestConfig,
        ): Promise<
            (
                axios?: AxiosInstance,
                basePath?: string,
            ) => Promise<AxiosResponse<Array<ApiChatRoomEntityWithMembersResponse>>>
        > {
            const localVarAxiosArgs = await ChatApiAxiosParamCreator(configuration).chatControllerGetSelfRooms(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = {
                    ...localVarAxiosArgs.options,
                    url: basePath + localVarAxiosArgs.url,
                };
                return axios.request(axiosRequestArgs);
            };
        },
    };
};

/**
 * ChatApi - factory interface
 * @export
 */
export const ChatApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetRoomDetails(
            id: string,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<ApiChatRoomEntityDetailsResponse>> {
            return ChatApiFp(configuration)
                .chatControllerGetRoomDetails(id, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chatControllerGetSelfRooms(
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<Array<ApiChatRoomEntityWithMembersResponse>>> {
            return ChatApiFp(configuration)
                .chatControllerGetSelfRooms(options)
                .then((request) => request(axios, basePath));
        },
    };
};

/**
 * ChatApi - object-oriented interface
 * @export
 * @class ChatApi
 * @extends {BaseAPI}
 */
export class ChatApi extends BaseAPI {
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public async chatControllerGetRoomDetails(
        id: string,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiChatRoomEntityDetailsResponse>> {
        return ChatApiFp(this.configuration)
            .chatControllerGetRoomDetails(id, options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChatApi
     */
    public async chatControllerGetSelfRooms(
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<Array<ApiChatRoomEntityWithMembersResponse>>> {
        return ChatApiFp(this.configuration)
            .chatControllerGetSelfRooms(options)
            .then((request) => request(this.axios, this.basePath));
    }
}
