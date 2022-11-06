import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import chatsReducer from 'store/chats/chats.reducer';
import localConfigReducer from 'store/localConfig/localConfig.reducer';
import { default as socketsReducer, socketsApi } from 'store/sockets/sockets.api';
import userReducer from 'store/user/user.reducer';
import windowSizeReducer from 'store/windowSize/windowSize.reducer';

export const makeStore = () =>
    configureStore({
        reducer: {
            windowSize: windowSizeReducer,
            localConfig: localConfigReducer,
            user: userReducer,
            chats: chatsReducer,
            [socketsApi.reducerPath]: socketsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketsApi.middleware),
    });

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state: AppState;
    /** type for `thunkApi.dispatch` */
    dispatch: AppDispatch;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
