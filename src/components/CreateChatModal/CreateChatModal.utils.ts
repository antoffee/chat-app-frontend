import { CreateChatErrors, CreateChatValues } from 'components/CreateChatModal/CreateChatModal.types';

import { REQUIRED_FILD_ERROR, TOO_MUCH_MEMBERS_ERROR } from '~constants';

export const validateCreateChat = (values: CreateChatValues): CreateChatErrors => ({
    description: undefined,
    isPrivate: undefined,
    members:
        values?.members?.length && !(values.isPrivate && values?.members?.length > 1)
            ? undefined
            : values.isPrivate && values?.members?.length > 1
            ? TOO_MUCH_MEMBERS_ERROR
            : REQUIRED_FILD_ERROR,
    name: values.isPrivate || values?.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
});

export const validateEditChat = (values: CreateChatValues): Partial<CreateChatErrors> => ({
    description: undefined,
    name: values?.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
});
