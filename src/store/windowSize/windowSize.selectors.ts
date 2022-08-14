import { AppState } from 'store';
import { Breakpoints } from 'types/breakpoints';

export const getIsMobile = (state: AppState) => state.windowSize.width <= Breakpoints['768px'];
