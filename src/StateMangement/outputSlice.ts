import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {CsvData} from "../App";
import {setNodeData} from "./nodesDataSlice";



interface OutputState {
    show: boolean;
    data: CsvData;
}


const initialState: OutputState = {
    show: false,
    data: [],
};


const outputSlice = createSlice({
    name: 'outputData',
    initialState,
    reducers: {
        outputPanelOpen(state) {
            state.show = true;
        },
        outputPanelClose(state) {
            state.show = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setNodeData, (state, action: PayloadAction<{ id: string; data: CsvData }>) => {
            state.data = action.payload.data;
            state.show = true;
        });
    },
});


export const {
    outputPanelOpen,
    outputPanelClose
} = outputSlice.actions;


export default outputSlice.reducer;