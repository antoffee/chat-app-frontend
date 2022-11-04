import { AppState } from 'store';

export const getIsLoggedIn = (state: AppState) => !!state.user?.user?.id;
