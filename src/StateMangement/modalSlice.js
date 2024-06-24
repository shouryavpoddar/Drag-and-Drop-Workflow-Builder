import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalOpen(state, action) {
            state.open = true;
        },
        modalClose(state, action) {
            state.open = false;
        }
    }
});

export const {
    modalOpen,
    modalClose
} = modalSlice.actions;

export default modalSlice.reducer;