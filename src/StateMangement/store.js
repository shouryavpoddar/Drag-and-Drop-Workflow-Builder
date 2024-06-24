import {configureStore} from "@reduxjs/toolkit";
import flowReducer from "./flowSlice";
import modalReducer from "./modalSlice";
import outputReducer from "./outputSlice";

export const store = configureStore({
    reducer: {
        flow: flowReducer,
        modal: modalReducer,
        output: outputReducer
    }
})