import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi, CreateUserDto, EmailApi, LoginDto } from 'generated';

const authApi = new AuthApi();
const emailApi = new EmailApi();

export const loginAction = createAsyncThunk('USER/LOGIN', async (req: LoginDto) => {
    const responce = await authApi.authControllerLogin(req);

    return responce.data;
});

export const signUpAction = createAsyncThunk('USER/SIGN_UP', async (req: CreateUserDto) => {
    const responce = await authApi.authControllerRegister(req);

    return responce.data;
});

export const authAction = createAsyncThunk('USER/AUTHENTIFICATE', async () => {
    const responce = await authApi.authControllerAuthenticate();

    return responce.data;
});

export const logoutAction = createAsyncThunk('USER/LOGOUT', async () => {
    await authApi.authControllerLogout();

    return undefined;
});

export const confirmEmailAction = createAsyncThunk('USER/CONFIRM_EMAIL', async (token: string) => {
    const response = await emailApi.emailControllerConfirmEmail({ token });

    return response.data;
});
