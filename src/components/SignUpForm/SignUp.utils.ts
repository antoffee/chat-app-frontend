import { isEmail } from 'utils';

import { SignUpErrors, SignUpValues } from './SignUpForm.types';

import { INVALID_FORMAT_ERROR, REQUIRED_FILD_ERROR } from '~constants';

export const validateSignUp = (values: SignUpValues): SignUpErrors => ({
    email: values.email ? (isEmail(values.email) ? undefined : INVALID_FORMAT_ERROR) : undefined,
    gender: undefined,
    name: undefined,
    password: values.password ? undefined : REQUIRED_FILD_ERROR,
    username: values.username ? undefined : REQUIRED_FILD_ERROR,
});
