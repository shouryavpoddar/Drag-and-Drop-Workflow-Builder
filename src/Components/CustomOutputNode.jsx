import {Handle} from "reactflow";
import useParentData from "../utils/UseParentData";
import {useDispatch} from "react-redux";
import {deleteNode} from "../StateMangement/flowSlice";

export default function CustomOutputNode ({id}){
    const parentData = useParentData(id);
    const dispatch = useDispatch();

    return (
        <div className="bg-gray-950 border border-gray-700 rounded-md p-2 w-64  hover:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Output</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            <div className="flex flex-col items-center bg-gray-700 rounded-lg p-0 text-gray-300">
                <p className="mb-2">Drop file here or</p>
                <button disabled={!parentData} onClick={()=>{
                    console.log(parentData);
                }} className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Output Data
                </button>
                <div className="mt-4 text-sm">Allowed types: csv, json</div>
            </div>
            <Handle type="target" position="left" className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );

}