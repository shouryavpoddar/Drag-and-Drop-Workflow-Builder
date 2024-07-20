import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './Slices/flowSlice';
import modalReducer from './Slices/modalSlice';
import outputReducer from './Slices/outputSlice';
import nodesDataReducer from './Slices/nodesDataSlice';
import terminalReducer from "./Slices/termialSlice";


export const store = configureStore({
    reducer: {
        nodesData: nodesDataReducer,
        flow: flowReducer,
        modal: modalReducer,
        output: outputReducer,
        terminal: terminalReducer
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;