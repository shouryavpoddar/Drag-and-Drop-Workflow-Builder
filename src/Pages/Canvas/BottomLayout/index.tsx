import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../StateMangement/store";
import {CsvData} from "../../../App";
import Table from "../../../Components/Table/Table"
import Terminal from "./Terminal/Terminal";

const BottomSection= ({height}: {height: number}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isOutputVisible = useSelector((state: RootState) => state.output.show);
    const data: CsvData | null = useSelector((state: RootState) => state.output.data);


    const exportToJSON = () => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="flex w-full h-full flex-grow-1 select-none">
            <div className="flex flex-col h-full w-full border-l border-[#5f7e97] bg-gray-800">
                <div
                    className="flex items-center px-5 border-b border-[#5f7e97] h-7 w-full flex-shrink-0 flex-grow-0 overflow-visible relative">
                    <div className="flex items-center gap-[20px] text-[12px] font-inter-semibold text-[#fff]">
                        <span>Output</span>
                    </div>
                </div>
                <div className="block text-[#fff] overflow-visible relative">
                    <Table height={height}/>
                </div>
            </div>
            <div className="flex flex-col h-full w-2/5 border-l border-[#5f7e97] max-w-[500px] bg-gray-800">
                <div
                    className="flex items-center px-5 border-b border-[#5f7e97] h-7 w-full flex-shrink-0 flex-grow-0 overflow-visible relative">
                    <div className="text-[12px] font-inter-semibold text-[#fff]">Logs</div>
                </div>
                <Terminal/>
            </div>
        </div>
    );
};

export default BottomSection;