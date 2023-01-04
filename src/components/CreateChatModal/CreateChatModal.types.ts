import { CustomSelectableValue } from 'types/select';

export type CreateChatModalProps = {
    onDismiss?: () => void;
};

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

export type CreateChatErrors = Record<keyof CreateChatValues, string | undefined>;
