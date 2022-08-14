import { WritableDraft } from 'immer/dist/internal';
import { AsyncState, FetchStatus } from 'types/asyncState';

export const handleAsyncActionFulfilled = (state: WritableDraft<AsyncState>) => {
    state.status = FetchStatus.FULFILLED;
    state.error = undefined;
};
