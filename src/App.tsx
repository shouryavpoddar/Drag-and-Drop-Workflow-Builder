// src/App.js
import './App.css';
import Canvas from "./Pages/Canvas";
import { Provider } from "react-redux";
import { store } from "./StateMangement/store";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';
import Login from './Components/auth/login';
import Register from './Components/auth/register';
import { AuthProvider } from "./contexts/authContext";
import Home from './Components/home';
import Header from './Components/header';

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
            <AuthProvider>
                <Router>
                <Header></Header>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/canvas" element={<Canvas />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </Provider>
    );
}
