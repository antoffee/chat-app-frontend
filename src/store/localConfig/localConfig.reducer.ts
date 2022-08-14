import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AsyncState, FetchStatus } from 'types/asyncState';
import { LocalConfig } from 'types/localConfig';

import { handleAsyncActionPending, handleAsyncActionReject } from 'utils';

import { refreshTheme, saveTheme } from './localConfig.actions';

export type LocalConfigState = AsyncState & LocalConfig;

const initialState: LocalConfigState = {
    status: FetchStatus.IDLE,
    theme: 'light',
};

export const localConfigSlice = createSlice({
    name: 'LOCAL_CONFIG',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(saveTheme.pending, refreshTheme.pending), handleAsyncActionPending);
        builder.addMatcher(isAnyOf(saveTheme.fulfilled, refreshTheme.fulfilled), (state, action) => {
            const newTheme = action.payload;
            state.status = FetchStatus.FULFILLED;

            if (newTheme === 'dark') {
                state.theme = newTheme;
            } else {
                state.theme = 'light';
            }
        });
        builder.addMatcher(isAnyOf(saveTheme.rejected, refreshTheme.rejected), handleAsyncActionReject);
    },
});

export default localConfigSlice.reducer;
