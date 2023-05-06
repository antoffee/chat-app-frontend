import { CustomSelectableValue } from 'types/select';

export type ChatDetailsModalProps = {
    onDismiss?: () => void;
    id: string;
};

export type ChatDetailsValues = {
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

export type ChatDetailsErrors = Record<keyof ChatDetailsValues, string | undefined>;
