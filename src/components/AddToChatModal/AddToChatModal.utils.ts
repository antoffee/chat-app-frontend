import { AddToChatErrors, AddToChatValues } from 'components/AddToChatModal/AddToChatModal.types';

import { REQUIRED_FILD_ERROR } from '~constants';

export const validateAddToChat = (values: AddToChatValues): AddToChatErrors => ({
    members: values?.members?.length ? undefined : REQUIRED_FILD_ERROR,
});
