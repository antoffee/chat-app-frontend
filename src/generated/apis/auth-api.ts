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
import { ApiUserEntityResponse } from '../models';
import { CreateUserDto } from '../models';
import { LoginDto } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerAuthenticate: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth`;
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
        authControllerChangePassword: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/change-password`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
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
         * @param {LoginDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin: async (body: LoginDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError(
                    'body',
                    'Required parameter body was null or undefined when calling authControllerLogin.',
                );
            }
            const localVarPath = `/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

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
            const needsSerialization =
                typeof body !== 'string' || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization
                ? JSON.stringify(body !== undefined ? body : {})
                : body || '';

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
        authControllerLogout: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/logout`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
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
         * @param {CreateUserDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerRegister: async (body: CreateUserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError(
                    'body',
                    'Required parameter body was null or undefined when calling authControllerRegister.',
                );
            }
            const localVarPath = `/auth/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

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
            const needsSerialization =
                typeof body !== 'string' || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization
                ? JSON.stringify(body !== undefined ? body : {})
                : body || '';

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    };
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerAuthenticate(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiUserEntityResponse>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authControllerAuthenticate(options);
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
        async authControllerChangePassword(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiUserEntityResponse>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authControllerChangePassword(
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
         * @param {LoginDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogin(
            body: LoginDto,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiUserEntityResponse>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authControllerLogin(body, options);
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
        async authControllerLogout(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authControllerLogout(options);
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
         * @param {CreateUserDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerRegister(
            body: CreateUserDto,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiUserEntityResponse>>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authControllerRegister(
                body,
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
    };
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerAuthenticate(options?: AxiosRequestConfig): Promise<AxiosResponse<ApiUserEntityResponse>> {
            return AuthApiFp(configuration)
                .authControllerAuthenticate(options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerChangePassword(
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<ApiUserEntityResponse>> {
            return AuthApiFp(configuration)
                .authControllerChangePassword(options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {LoginDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogin(
            body: LoginDto,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<ApiUserEntityResponse>> {
            return AuthApiFp(configuration)
                .authControllerLogin(body, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogout(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return AuthApiFp(configuration)
                .authControllerLogout(options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {CreateUserDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerRegister(
            body: CreateUserDto,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<ApiUserEntityResponse>> {
            return AuthApiFp(configuration)
                .authControllerRegister(body, options)
                .then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async authControllerAuthenticate(
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiUserEntityResponse>> {
        return AuthApiFp(this.configuration)
            .authControllerAuthenticate(options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async authControllerChangePassword(
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiUserEntityResponse>> {
        return AuthApiFp(this.configuration)
            .authControllerChangePassword(options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {LoginDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async authControllerLogin(
        body: LoginDto,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiUserEntityResponse>> {
        return AuthApiFp(this.configuration)
            .authControllerLogin(body, options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async authControllerLogout(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
        return AuthApiFp(this.configuration)
            .authControllerLogout(options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {CreateUserDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public async authControllerRegister(
        body: CreateUserDto,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiUserEntityResponse>> {
        return AuthApiFp(this.configuration)
            .authControllerRegister(body, options)
            .then((request) => request(this.axios, this.basePath));
    }
}
