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
/**
 *
 * @export
 * @interface CreateGroupChatRoomDto
 */
export interface CreateGroupChatRoomDto {
    /**
     *
     * @type {Array<number>}
     * @memberof CreateGroupChatRoomDto
     */
    members: Array<number>;
    /**
     *
     * @type {string}
     * @memberof CreateGroupChatRoomDto
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof CreateGroupChatRoomDto
     */
    description?: string;
}