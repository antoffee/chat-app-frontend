import { UsersApi } from 'generated';

import { isEmail } from 'utils';

import { SignUpErrors, SignUpValues } from './SignUpForm.types';

import { INVALID_FORMAT_ERROR, REQUIRED_FILD_ERROR } from '~constants';

export const validateSignUp = (values: SignUpValues): SignUpErrors => ({
    email: values.email ? (isEmail(values.email) ? undefined : INVALID_FORMAT_ERROR) : undefined,
    name: undefined,
    password: values.password ? undefined : REQUIRED_FILD_ERROR,
    username: values.username ? undefined : REQUIRED_FILD_ERROR,
});

const usersApi = new UsersApi();

export const validateUsernameAvailability = async (username: string) => {
    if (!username?.trim()) return REQUIRED_FILD_ERROR;

    const response = await usersApi.usersControllerCheckUsernameAvailable({ username });

    return response?.data?.available ? undefined : 'Занято';
};

export const validateRequired = (password: string) => (password?.trim() ? undefined : REQUIRED_FILD_ERROR);

export const validateEmail = (email: string) =>
    email ? (isEmail(email) ? undefined : INVALID_FORMAT_ERROR) : undefined;
