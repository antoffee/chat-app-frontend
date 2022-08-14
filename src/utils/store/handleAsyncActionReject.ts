import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { AsyncState, FetchStatus } from 'types/asyncState';

export const handleAsyncActionReject = (
    state: WritableDraft<AsyncState>,
    action: PayloadAction<
        unknown,
        string,
        {
            arg: unknown;
            requestId: string;
            requestStatus: 'rejected';
            aborted: boolean;
            condition: boolean;
        },
        SerializedError
    >,
) => {
    state.status = FetchStatus.REJECTED;
    state.error = action.error.message;

    console.error(`at ${action.type}`, action.error);
};
