import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WindowSizeState = {
    width: number;
    height: number;
};

const initialState: WindowSizeState = {
    width: 0,
    height: 0,
};

export const windowSizeSlice = createSlice({
    name: 'WINDOW_SIZE',
    initialState,
    reducers: {
        setWidth: (state, { payload }: PayloadAction<number>) => {
            state.width = payload;
        },
        setHeight: (state, { payload }: PayloadAction<number>) => {
            state.height = payload;
        },
    },
});

export const { setHeight, setWidth } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;
