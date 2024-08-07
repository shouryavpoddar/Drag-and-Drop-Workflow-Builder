// src/components/Canvas.tsx
import React from 'react';
import 'reactflow/dist/style.css';
import Builder from './Builder';
import { useResizable } from '../../hooks/useResizable';
import BottomLayout from './BottomLayout';
import {useDispatch} from "react-redux";
import {loadState, saveState} from "../../StateMangement/Slices/flowSlice";

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const { handleMouseDown, height, availablelHeight } = useResizable();

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            <div className="flex-none w-full border-b h-10 flex items-center bg-gray-800">
                <button onClick={()=>{dispatch(loadState())}} className="ml-3 hover:bg-slate-100 outline outline-1 shadow mt-2 space-y-2 p-1 items-center rounded-lg bg-gray-600">Dashboard</button>
                <button onClick={()=>{dispatch(saveState())}} className="ml-3 hover:bg-slate-100 outline outline-1 shadow mt-2 space-y-2 p-1 items-center rounded-lg bg-gray-600">Save</button>
            </div>
            <div className="flex-grow w-full relative">
                <Builder handleMouseDown={handleMouseDown} height={height} />
            </div>
            <BottomLayout height={availablelHeight - height} />
        </div>
    );
}

export default Index;