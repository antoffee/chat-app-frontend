import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'api/axios';
import { localConfigService } from 'api/localConfigService';
import { AxiosResponse } from 'axios';
import {
    ApiFaceInfoEntityResponse,
    ApiUserEntityWithFaceInfoResponse,
    AuthApi,
    ChangePasswordDto,
    CreateUserDto,
    EmailApi,
    FaceAnalyzeApi,
    LoginDto,
    UpdateFaceInfoDto,
    UpdateUserDto,
    UsersApi,
} from 'generated';
import heic2any from 'heic2any';
import { socketsApi } from 'store/sockets';
import { usersApi } from 'store/users';

import { hexToRgbString } from 'utils';

const authApi = new AuthApi();
const emailApi = new EmailApi();
const userApi = new UsersApi();
const faceApi = new FaceAnalyzeApi();

const wrapAuthTryCatch = async <T>(cb: () => Promise<T>) => {
    try {
        return cb();
    } catch (err) {
        await localConfigService.removeHeader();
        throw err;
    }
};

export const loginAction = createAsyncThunk('USER/LOGIN', async (req: LoginDto) => {
    return wrapAuthTryCatch(async () => {
        const responce = await authApi.authControllerLogin(req);

        return responce.data;
    });
});

export const signUpAction = createAsyncThunk('USER/SIGN_UP', async (req: CreateUserDto) => {
    const responce = await authApi.authControllerRegister(req);

    return responce.data;
});

export const authAction = createAsyncThunk('USER/AUTHENTIFICATE', async () => {
    return wrapAuthTryCatch(async () => {
        const responce = await userApi.usersControllerGetSelfFaceInfo();

        return responce.data;
    });
});

export const logoutAction = createAsyncThunk('USER/LOGOUT', async () => {
    return wrapAuthTryCatch(async () => {
        await authApi.authControllerLogout();

        await localConfigService.removeHeader();

        usersApi.util.resetApiState();
        socketsApi.util.resetApiState();

        return undefined;
    });
});

export const confirmEmailAction = createAsyncThunk('USER/CONFIRM_EMAIL', async (token: string) => {
    const response = await emailApi.emailControllerConfirmEmail({ token });

    return response.data;
});

export const updateProfileAction = createAsyncThunk('USER/UPDATE', async (dto: UpdateUserDto) => {
    const responce = await userApi.usersControllerUpdateSelf(dto);

    return responce.data;
});

export const updatePasswordAction = createAsyncThunk('USER/RESET_PASSWORD', async (dto: ChangePasswordDto) => {
    await emailApi.emailControllerChangePassword(dto);
});

export type FileInput = { filePath: string; mimeType: string; fileName: string };

export const createFileFromBase64 = async ({ fileName, filePath, mimeType }: FileInput) => {
    const rawFile = await fetch(filePath)
        .then((res) => res.blob())
        .then((blob) => {
            return new File([blob], fileName, { type: mimeType });
        });
    let file: File;
    if (rawFile.type.toLowerCase().includes('heic')) {
        const pngFile = await heic2any({
            blob: rawFile,
            toType: 'image/png',
            quality: 0.1,
        });

        file = new File([pngFile as Blob], fileName, { type: 'image/png' });
    } else {
        file = rawFile;
    }

    return file;
};

export const uploadAvatarAction = createAsyncThunk('USER/GENERATE_AVATAR', async (input: FileInput) => {
    const file = await createFileFromBase64(input);
    const data = new FormData();
    data.set('avatar', file);
    const fileResponse = await axiosInstance.post<FormData, AxiosResponse<ApiUserEntityWithFaceInfoResponse>>(
        '/chat-api/files/avatar',
        data,
        {
            headers: { 'Content-Length': file.size },
        },
    );

    return fileResponse.data;
});

export const saveFaceInfo = createAction('USER/SAVE_FACE_INFO', (faceInfo: ApiFaceInfoEntityResponse) => {
    return { payload: faceInfo };
});

export const deleteFaceInfo = createAsyncThunk('USER/DELETE_FACE_INFO', async () => {
    await faceApi.faceControllerRemove();

    return undefined;
});

export const updateFaceInfo = createAsyncThunk('USER/UPDATE_FACE_INFO', async (dto: UpdateFaceInfoDto) => {
    const preparedDto: UpdateFaceInfoDto = { ...dto };
    if (dto.hairColor) {
        preparedDto.hairColor = hexToRgbString(dto.hairColor);
    }

    if (dto.skinColor) {
        preparedDto.skinColor = hexToRgbString(dto.skinColor);
    }

    const result = await faceApi.faceControllerUpdate(preparedDto);

    return result.data;
});
