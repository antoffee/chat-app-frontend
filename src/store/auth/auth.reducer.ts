import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ApiUserEntityWithFaceInfoResponse } from 'generated';
import {
    authAction,
    confirmEmailAction,
    deleteFaceInfo,
    loginAction,
    logoutAction,
    saveFaceInfo,
    signUpAction,
    updateFaceInfo,
    updatePasswordAction,
    updateProfileAction,
    uploadAvatarAction,
} from 'store/auth/auth.actions';
import { FetchStatus } from 'types/asyncState';

import { colorNameToHex, rgbStrToHex } from 'utils';

export type UserState = {
    user?: ApiUserEntityWithFaceInfoResponse;
    loadingStatus: FetchStatus;
    errorMessage: string;
};

const initialState: UserState = {
    user: undefined,
    loadingStatus: FetchStatus.IDLE,
    errorMessage: '',
};

export const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFaceInfo.fulfilled, (state) => {
                if (state.user) {
                    state.user = { ...state.user, faceInfo: undefined };
                }
                state.errorMessage = '';
                state.loadingStatus = FetchStatus.FULFILLED;
            })
            .addCase(updatePasswordAction.fulfilled, (state) => {
                state.loadingStatus = FetchStatus.FULFILLED;
            })
            .addCase(logoutAction.fulfilled, () => initialState)
            .addMatcher(isAnyOf(saveFaceInfo, updateFaceInfo.fulfilled), (state, { payload }) => {
                if (state.user) {
                    state.user = {
                        ...state.user,
                        faceInfo: {
                            ...payload,
                            hairColor: rgbStrToHex(payload.hairColor),
                            leftEyeColor: colorNameToHex(payload.leftEyeColor),
                            rightEyeColor: colorNameToHex(payload.rightEyeColor),
                            skinColor: rgbStrToHex(payload.skinColor),
                        },
                    };
                    state.loadingStatus = FetchStatus.FULFILLED;
                }
            })
            .addMatcher(
                isAnyOf(
                    authAction.fulfilled,
                    signUpAction.fulfilled,
                    loginAction.fulfilled,
                    confirmEmailAction.fulfilled,
                    updateProfileAction.fulfilled,
                    uploadAvatarAction.fulfilled,
                ),
                (state, { payload }) => {
                    const userInfo = payload as ApiUserEntityWithFaceInfoResponse;

                    if (userInfo?.faceInfo) {
                        userInfo.faceInfo.hairColor = rgbStrToHex(userInfo.faceInfo.hairColor);
                        userInfo.faceInfo.leftEyeColor = colorNameToHex(userInfo.faceInfo.leftEyeColor);
                        userInfo.faceInfo.rightEyeColor = colorNameToHex(userInfo.faceInfo.rightEyeColor);
                        userInfo.faceInfo.skinColor = rgbStrToHex(userInfo.faceInfo.skinColor);
                    }

                    state.user = userInfo;
                    state.errorMessage = '';
                    state.loadingStatus = FetchStatus.FULFILLED;
                },
            )
            .addMatcher(
                isAnyOf(
                    loginAction.pending,
                    signUpAction.pending,
                    authAction.pending,
                    logoutAction.pending,
                    confirmEmailAction.pending,
                    updateProfileAction.pending,
                    uploadAvatarAction.pending,
                    deleteFaceInfo.pending,
                    updatePasswordAction.pending,
                ),
                (state) => {
                    state.errorMessage = '';
                    state.loadingStatus = FetchStatus.PENDING;
                },
            )
            .addMatcher(
                isAnyOf(
                    loginAction.rejected,
                    signUpAction.rejected,
                    authAction.rejected,
                    logoutAction.rejected,
                    confirmEmailAction.rejected,
                    updateProfileAction.rejected,
                    uploadAvatarAction.rejected,
                    deleteFaceInfo.rejected,
                    updatePasswordAction.rejected,
                ),
                (state, { error, type }) => {
                    if (!type?.includes(authAction.typePrefix)) {
                        state.errorMessage = error?.message ?? 'Error';
                    }
                    state.loadingStatus = FetchStatus.REJECTED;
                },
            );
    },
});

export default userSlice.reducer;
export const { clearUserError } = userSlice.actions;
