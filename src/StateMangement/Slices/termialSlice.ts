import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState : {
    logs: {type: string
        command?: string
        error?: string
        info?: string}[]
} = {
    logs: []
}

const terminalSlice = createSlice({
    name: 'terminal',
    initialState : initialState,
    reducers:{
        updateLogs: (state, { payload }: PayloadAction<{
            type: string
            command?: string
            error?: string
            info?: string
        }>) => {
            state.logs.push({ ...payload })
        },
        clearLogs: (state) => {
            state.logs = []
        },
    }
})

export const {
    updateLogs,
    clearLogs
} = terminalSlice.actions;

export default terminalSlice.reducer;