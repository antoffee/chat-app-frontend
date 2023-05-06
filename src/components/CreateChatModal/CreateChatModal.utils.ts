import { CreateChatErrors, CreateChatValues } from 'components/CreateChatModal/CreateChatModal.types';

import { REQUIRED_FILD_ERROR } from '~constants';

export const validateCreateChat = (values: CreateChatValues): CreateChatErrors => ({
    description: undefined,
    isPrivate: undefined,
    members: values?.members?.length ? undefined : REQUIRED_FILD_ERROR,
    name: values?.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
});

export const validateEditChat = (values: CreateChatValues): Partial<CreateChatErrors> => ({
    description: undefined,
    name: values?.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
});
