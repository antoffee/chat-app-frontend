import { EditSettingsValues } from 'components/SidebarSettingsEdit/SidebarSettingsEdit.types';
import { isEmail } from 'utils';

import { INVALID_FORMAT_ERROR, REQUIRED_FILD_ERROR } from '~constants';

export const validateEdit = (values: EditSettingsValues) => {
    return {
        name: values.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
        username: values.username?.trim() ? undefined : REQUIRED_FILD_ERROR,
        email: values.email ? (!isEmail(values.email) ? INVALID_FORMAT_ERROR : undefined) : undefined,
    };
};
