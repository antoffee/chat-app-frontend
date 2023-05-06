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
import { ChangePasswordDto } from '../models';
import { ConfirmEmailDto } from '../models';
import { ForgotPasswordDto } from '../models';
/**
 * EmailApi - axios parameter creator
 * @export
 */
export const EmailApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {ChangePasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailControllerChangePassword: async (
            body: ChangePasswordDto,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError(
                    'body',
                    'Required parameter body was null or undefined when calling emailControllerChangePassword.',
                );
            }
            const localVarPath = `/chat-api/email/change-password`;
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
         * @param {ConfirmEmailDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailControllerConfirmEmail: async (
            body: ConfirmEmailDto,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError(
                    'body',
                    'Required parameter body was null or undefined when calling emailControllerConfirmEmail.',
                );
            }
            const localVarPath = `/chat-api/email/confirm`;
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
         * @param {ForgotPasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        emailControllerForgotPassword: async (
            body: ForgotPasswordDto,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError(
                    'body',
                    'Required parameter body was null or undefined when calling emailControllerForgotPassword.',
                );
            }
            const localVarPath = `/chat-api/email/forgot-password`;
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
        emailControllerResendConfirmationLink: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/chat-api/email/resend-confirmation`;
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
    };
};

/**
 * EmailApi - functional programming interface
 * @export
 */
export const EmailApiFp = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {ChangePasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerChangePassword(
            body: ChangePasswordDto,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await EmailApiAxiosParamCreator(configuration).emailControllerChangePassword(
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
        /**
         *
         * @param {ConfirmEmailDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerConfirmEmail(
            body: ConfirmEmailDto,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ApiUserEntityResponse>>> {
            const localVarAxiosArgs = await EmailApiAxiosParamCreator(configuration).emailControllerConfirmEmail(
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
        /**
         *
         * @param {ForgotPasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerForgotPassword(
            body: ForgotPasswordDto,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await EmailApiAxiosParamCreator(configuration).emailControllerForgotPassword(
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
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerResendConfirmationLink(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await EmailApiAxiosParamCreator(
                configuration,
            ).emailControllerResendConfirmationLink(options);
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
 * EmailApi - factory interface
 * @export
 */
export const EmailApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         *
         * @param {ChangePasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerChangePassword(
            body: ChangePasswordDto,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<void>> {
            return EmailApiFp(configuration)
                .emailControllerChangePassword(body, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {ConfirmEmailDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerConfirmEmail(
            body: ConfirmEmailDto,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<ApiUserEntityResponse>> {
            return EmailApiFp(configuration)
                .emailControllerConfirmEmail(body, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {ForgotPasswordDto} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerForgotPassword(
            body: ForgotPasswordDto,
            options?: AxiosRequestConfig,
        ): Promise<AxiosResponse<void>> {
            return EmailApiFp(configuration)
                .emailControllerForgotPassword(body, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async emailControllerResendConfirmationLink(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return EmailApiFp(configuration)
                .emailControllerResendConfirmationLink(options)
                .then((request) => request(axios, basePath));
        },
    };
};

/**
 * EmailApi - object-oriented interface
 * @export
 * @class EmailApi
 * @extends {BaseAPI}
 */
export class EmailApi extends BaseAPI {
    /**
     *
     * @param {ChangePasswordDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailApi
     */
    public async emailControllerChangePassword(
        body: ChangePasswordDto,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
        return EmailApiFp(this.configuration)
            .emailControllerChangePassword(body, options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {ConfirmEmailDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailApi
     */
    public async emailControllerConfirmEmail(
        body: ConfirmEmailDto,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<ApiUserEntityResponse>> {
        return EmailApiFp(this.configuration)
            .emailControllerConfirmEmail(body, options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {ForgotPasswordDto} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailApi
     */
    public async emailControllerForgotPassword(
        body: ForgotPasswordDto,
        options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
        return EmailApiFp(this.configuration)
            .emailControllerForgotPassword(body, options)
            .then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailApi
     */
    public async emailControllerResendConfirmationLink(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
        return EmailApiFp(this.configuration)
            .emailControllerResendConfirmationLink(options)
            .then((request) => request(this.axios, this.basePath));
    }
}
