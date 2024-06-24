import React from "react";
import {useDispatch} from "react-redux";
import { addInputNode} from "../StateMangement/flowSlice";
import Papa from "papaparse";
import {modalClose} from "../StateMangement/modalSlice";

export default function NodeSelectionComponent({title, description, input, output, data: csvFilePath,  addNodeFunction}){
    const dispatch = useDispatch()

    const onClick = () => {
        let data= []
        fetch(csvFilePath)
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        data = (results.data);
                    },
                    error: function(error) {
                        console.error('Error:', error.message);
                    }
                });
            }).then(() => {
                if(title === 'File'){
                    dispatch(addInputNode(data))
                } else{
                    dispatch(addNodeFunction())
                }
            dispatch(modalClose())
        });
    }

    return (
        <div onClick={onClick} className="bg-gray-800 cursor-pointer p-4 rounded-lg transform transition-transform duration-300 hover:bg-gray-700 hover:border hover:border-amber-50 hover:scale-105">
            <h3 className="font-semibold">{title}</h3>
            <p>{description}</p>
            { input &&
            <p className="mt-2 text-gray-400">Input: -{input}</p>
            }
            <p className="text-gray-400">Output: {output}</p>
        </div>
    )
}