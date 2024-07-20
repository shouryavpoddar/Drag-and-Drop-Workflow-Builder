import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './flowSlice';
import modalReducer from './modalSlice';
import outputReducer from './outputSlice';
import nodesDataReducer from './nodesDataSlice';


export const store = configureStore({
    reducer: {
        nodesData: nodesDataReducer,
        flow: flowReducer,
        modal: modalReducer,
        output: outputReducer,
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;