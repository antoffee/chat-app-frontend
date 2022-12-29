import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'store/auth/auth.reducer';
import localConfigReducer from 'store/localConfig/localConfig.reducer';
import { socketsApi } from 'store/sockets/sockets.api';
import { usersApi } from 'store/users';
import windowSizeReducer from 'store/windowSize/windowSize.reducer';

export const makeStore = () =>
    configureStore({
        reducer: {
            windowSize: windowSizeReducer,
            localConfig: localConfigReducer,
            auth: authReducer,
            [socketsApi.reducerPath]: socketsApi.reducer,
            [usersApi.reducerPath]: usersApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketsApi.middleware, usersApi.middleware),
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
