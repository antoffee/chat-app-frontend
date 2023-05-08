import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ApiUserEntityResponse } from 'generated';
import {
    authAction,
    confirmEmailAction,
    loginAction,
    logoutAction,
    signUpAction,
    updateProfileAction,
    uploadAvatarAction,
} from 'store/auth/auth.actions';
import { FetchStatus } from 'types/asyncState';

export type UserState = {
    user?: ApiUserEntityResponse;
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
            .addMatcher(
                isAnyOf(
                    authAction.fulfilled,
                    signUpAction.fulfilled,
                    loginAction.fulfilled,
                    logoutAction.fulfilled,
                    confirmEmailAction.fulfilled,
                    updateProfileAction.fulfilled,
                    uploadAvatarAction.fulfilled,
                ),
                (state, { payload }) => {
                    state.user = payload as ApiUserEntityResponse;
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
