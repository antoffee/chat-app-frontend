import { LoginErrors, LoginValues } from 'components/LoginForm/LoginForm.types';

import { REQUIRED_FILD_ERROR } from '~constants';

export const validateLogin = (values: LoginValues): LoginErrors => ({
    password: values.password ? undefined : REQUIRED_FILD_ERROR,
    username: values.username ? undefined : REQUIRED_FILD_ERROR,
});
