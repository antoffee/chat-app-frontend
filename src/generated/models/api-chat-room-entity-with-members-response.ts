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
import { ApiChatMessageEntityDetailsResponse } from './api-chat-message-entity-details-response';
import { ApiUserEntityResponse } from './api-user-entity-response';
/**
 *
 * @export
 * @interface ApiChatRoomEntityWithMembersResponse
 */
export interface ApiChatRoomEntityWithMembersResponse {
    /**
     *
     * @type {number}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    type: ApiChatRoomEntityWithMembersResponseTypeEnum;
    /**
     *
     * @type {string}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    description?: string;
    /**
     *
     * @type {Date}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    createdAt: Date;
    /**
     *
     * @type {Date}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    updatedAt: Date;
    /**
     *
     * @type {Array<ApiChatMessageEntityDetailsResponse>}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    messages: Array<ApiChatMessageEntityDetailsResponse>;
    /**
     * Max count of members is 2 to limit it's from above
     * @type {Array<ApiUserEntityResponse>}
     * @memberof ApiChatRoomEntityWithMembersResponse
     */
    members: Array<ApiUserEntityResponse>;
}

/**
 * @export
 * @enum {string}
 */
export enum ApiChatRoomEntityWithMembersResponseTypeEnum {
    PRIVATE = 'PRIVATE',
    GROUP = 'GROUP',
}
