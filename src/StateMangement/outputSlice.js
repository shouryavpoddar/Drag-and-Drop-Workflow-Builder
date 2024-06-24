import { createSlice } from '@reduxjs/toolkit';
import {setNodeData} from "./flowSlice";

const initialState = {
    show: false,
    data: null
};

const outputSlice = createSlice({
    name: 'outputData',
    initialState,
    reducers: {
        outputPanelOpen(state, action) {
            state.show = true;
        },
        outputPanelClose(state, action) {
            state.show = false;
        }
    }, extraReducers: (builder) => {
        builder.addCase(setNodeData, (state, action) => {
            state.data = action.payload.data;
            state.show= true;
        });
    }
});

export const {
    outputPanelOpen,
    outputPanelClose
} = outputSlice.actions;

export default outputSlice.reducer;