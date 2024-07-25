// nodesDataSlice.ts
import { CsvData } from "../../App";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import {loadState, saveState} from "./flowSlice"; // Adjust the import path according to your project structure

interface NodesDataState {
    dataBase: { [key: string]: CsvData }; // Corrected type definition for dataBase
}

const initialState: NodesDataState = {
    dataBase: {}
};

const nodesDataSlice = createSlice({
    name: "nodesData",
    initialState,
    reducers: {
        setNodeData(state, action: PayloadAction<{ id: string; data: CsvData }>) {
            const { id, data } = action.payload;
            state.dataBase[id] = data;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveState, (state, action) => {
            const dataBase = JSON.stringify(state);
            localStorage.setItem('dataBase', dataBase);
        });
        builder.addCase(loadState, (state) => {
            const dataBase: any = localStorage.getItem('dataBase');
            if (dataBase) {
                state.dataBase = JSON.parse(dataBase).dataBase;
            }
        });
    }
});

export const { setNodeData } = nodesDataSlice.actions;

// Selector to get data for a single ID
export const selectNodeDataById = (state: RootState, id: string) => state.nodesData.dataBase[id];

export default nodesDataSlice.reducer;