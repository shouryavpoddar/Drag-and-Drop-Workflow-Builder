import { createSlice } from '@reduxjs/toolkit';


interface ModalState {
    open: boolean;
}


const initialState: ModalState = {
    open: false,
};


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalOpen(state) {
            state.open = true;
        },
        modalClose(state) {
            state.open = false;
        }
    }
});


export const {
    modalOpen,
    modalClose
} = modalSlice.actions;


export default modalSlice.reducer;