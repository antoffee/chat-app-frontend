import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ApiChatRoomEntityResponse } from 'generated';
import { getChatList } from 'store/chats/chats.actions';
import { FetchStatus } from 'types/asyncState';

export type UserState = {
    chatList?: ApiChatRoomEntityResponse[];
    loadingStatus: FetchStatus;
    errorMessage: string;
};

const initialState: UserState = {
    chatList: undefined,
    loadingStatus: FetchStatus.IDLE,
    errorMessage: '',
};

export const userSlice = createSlice({
    name: 'CHATS',
    initialState,
    reducers: {
        clearChatError: (state) => {
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(getChatList.fulfilled), (state, { payload }) => {
                state.chatList = payload.data;
                state.errorMessage = '';
                state.loadingStatus = FetchStatus.FULFILLED;
            })
            .addMatcher(isAnyOf(getChatList.pending), (state) => {
                state.errorMessage = '';
                state.loadingStatus = FetchStatus.PENDING;
            })
            .addMatcher(isAnyOf(getChatList.rejected), (state, { error }) => {
                state.errorMessage = error?.message ?? 'Error';
                state.loadingStatus = FetchStatus.PENDING;
            });
    },
});

export default userSlice.reducer;
export const { clearChatError: clearChatError } = userSlice.actions;
