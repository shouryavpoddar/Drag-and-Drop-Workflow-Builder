import React from "react";
import { useDispatch } from "react-redux";
import { addInputNode } from "../StateMangement/flowSlice";
import Papa from "papaparse";
import { modalClose } from "../StateMangement/modalSlice";
import {AppDispatch} from "../StateMangement/store";
import {Action, UnknownAction} from "@reduxjs/toolkit";

// Define the props for the component
interface NodeSelectionComponentProps {
    title: string;
    description: string;
    input?: string;
    output: string;
    addNodeFunction: () => Action | UnknownAction;
}

const NodeSelectionComponent: React.FC<NodeSelectionComponentProps>
    = ({title,
       description,
       input,
       output,
       addNodeFunction,}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClick = () => {
        dispatch(addNodeFunction());
        dispatch(modalClose())
    };

    return (
        <div
            onClick={onClick}
            className="bg-gray-800 cursor-pointer p-4 rounded-lg transform transition-transform duration-300 hover:bg-gray-700 hover:border hover:border-amber-50 hover:scale-105"
        >
            <h3 className="font-semibold">{title}</h3>
            <p>{description}</p>
            {input && <p className="mt-2 text-gray-400">Input: -{input}</p>}
            <p className="text-gray-400">Output: {output}</p>
        </div>
    );
};

export default NodeSelectionComponent;