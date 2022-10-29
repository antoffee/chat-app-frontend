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
import { ApiChatMessageAuthorResponse } from './api-chat-message-author-response';
/**
 *
 * @export
 * @interface ApiChatMessageEntityDetailsResponse
 */
export interface ApiChatMessageEntityDetailsResponse {
    /**
     *
     * @type {number}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    content: string;
    /**
     *
     * @type {number}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    chatRoomEntityId: number;
    /**
     *
     * @type {number}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    authorEntityId: number;
    /**
     *
     * @type {Date}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    createdAt: Date;
    /**
     *
     * @type {Date}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    updatedAt: Date;
    /**
     *
     * @type {ApiChatMessageAuthorResponse}
     * @memberof ApiChatMessageEntityDetailsResponse
     */
    author: ApiChatMessageAuthorResponse;
}