import { CustomSelectableValue } from 'types/select';

export type CreateChatModalProps = Record<string, undefined>;

export type CreateChatValues = {
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

    members: CustomSelectableValue[];
    isPrivate?: boolean;
};
