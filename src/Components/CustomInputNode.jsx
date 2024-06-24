import {useCallback} from "react";
import {Handle} from "reactflow";
import {deleteNode} from "../StateMangement/flowSlice";
import {useDispatch} from "react-redux";

export default function CustomInputNode ({id}){
    const dispatch = useDispatch();

    return (
        <div className="bg-gray-950 border border-gray-700 rounded-md p-2 w-64  hover:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">File</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            <div className="flex flex-col items-center bg-gray-700 rounded-lg p-0 text-gray-300">
                <p className="mb-2">Drop file here or</p>
                <button className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Open file dialog
                </button>
                <div className="mt-4 text-sm">Allowed types: csv, json</div>
            </div>
            <Handle type="source" position="right" className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );

}