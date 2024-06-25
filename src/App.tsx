import './App.css'
import Canvas from "./Pages/Canvas";
import {Provider} from "react-redux";
import {store} from "./StateMangement/store";
import React from 'react';


export type CustomData = {
    id: string;
}


export interface CsvRow {
    [key: string]: string | number | boolean | null;
}


export interface CsvData extends Array<CsvRow> {}


export default function App() {

    return (
        <Provider store={store}>
            <Canvas/>
        </Provider>
    );
}
