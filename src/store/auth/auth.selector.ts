import { AppState } from 'store';

export const getIsLoggedIn = (state: AppState) => !!state.auth?.user?.id;
