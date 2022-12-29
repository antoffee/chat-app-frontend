import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi, CreateUserDto, LoginDto } from 'generated';

const authApi = new AuthApi();

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
