import { WritableDraft } from 'immer/dist/internal';
import { AsyncState, FetchStatus } from 'types/asyncState';

export const handleAsyncActionPending = (state: WritableDraft<AsyncState>) => {
    state.error = undefined;
    state.status = FetchStatus.PENDING;
};
