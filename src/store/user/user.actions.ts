import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi, CreateUserDto, LoginDto } from 'generated';

const authApi = new AuthApi();

export const loginAction = createAsyncThunk(
    'USER/LOGIN',
    async (req: LoginDto) => await authApi.authControllerLogin(req),
);

export const signUpAction = createAsyncThunk(
    'USER/SIGN_UP',
    async (req: CreateUserDto) => await authApi.authControllerRegister(req),
);

export const authAction = createAsyncThunk(
    'USER/AUTHENTIFICATE',
    async () => await authApi.authControllerAuthenticate(),
);
