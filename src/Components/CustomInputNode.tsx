import React, {useCallback, useState} from "react";
import { Handle, NodeProps, Position } from "reactflow";
import {deleteNode} from "../StateMangement/flowSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../StateMangement/store";
import {CsvData, CustomData} from "../App";
import Papa from "papaparse";
import {setNodeData} from "../StateMangement/nodesDataSlice";

export default function CustomInputNode({ id }: NodeProps<CustomData>) {
    const dispatch: AppDispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result  ) => {
                    dispatch(setNodeData({ id, data: result.data as CsvData}))
                },
            });
            setFile(file);
        }
            console.log("Uploaded file:", file);
            // You can add more logic to handle the file content
    }, []);

    return (
        <div className="bg-gray-950 border border-gray-700 rounded-md p-2 w-64 hover:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">File</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            <div className="flex flex-col items-center bg-gray-700 rounded-lg p-4 text-gray-300">
                <p className="mb-2">Drop file here or</p>
                <label className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer">
                    Open file dialog
                    <input
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
                <div className="mt-4 text-sm">Allowed types: csv</div>
            </div>
            <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );
}