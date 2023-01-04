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
 * @interface UserEntityResponseDto
 */
export interface UserEntityResponseDto {
    /**
     *
     * @type {number}
     * @memberof UserEntityResponseDto
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof UserEntityResponseDto
     */
    username: string;
    /**
     *
     * @type {string}
     * @memberof UserEntityResponseDto
     */
    password: string;
    /**
     *
     * @type {string}
     * @memberof UserEntityResponseDto
     */
    name: string;
    /**
     *
     * @type {Array<any>}
     * @memberof UserEntityResponseDto
     */
    roles: Array<any>;
    /**
     *
     * @type {string}
     * @memberof UserEntityResponseDto
     */
    email: string;
    /**
     *
     * @type {boolean}
     * @memberof UserEntityResponseDto
     */
    isEmailConfirmed: boolean;
    /**
     *
     * @type {number}
     * @memberof UserEntityResponseDto
     */
    avatarFileEntityId: number | null;
}
