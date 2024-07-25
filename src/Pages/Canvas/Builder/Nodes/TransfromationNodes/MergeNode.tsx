import {CsvData, CustomData} from "../../../../../App";
import {Handle, NodeProps, Position} from "reactflow";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import React, {useState} from "react";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const innerJoin = (data1: CsvData, data2: CsvData, keys1: string[], keys2: string[]): CsvData => {
    if (!data1 || !data2 || !keys1.length || !keys2.length) return [];

    const joinedData: CsvData = [];

    data1.forEach(row1 => {
        data2.forEach(row2 => {
            let isMatch = true;
            for (let i = 0; i < keys1.length; i++) {
                if (row1[keys1[i]] !== row2[keys2[i]]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                joinedData.push({ ...row1, ...row2 });
            }
        });
    });

    console.log('Joined Data:', joinedData)
    return joinedData;
};

const MergeNode = ({ id, data }: NodeProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData1, parentData2] = useParentData(id) as [CsvData | null, CsvData | null];
    const [joinKeys1, setJoinKeys1] = useState<string[]>(data?.joinKeys1 || ['']);
    const [joinKeys2, setJoinKeys2] = useState<string[]>(data?.joinKeys2 || ['']);
    const handleKeyChange1 = (index: number, value: string) => {
        const newJoinKeys = [...joinKeys1];
        newJoinKeys[index] = value;
        setJoinKeys1(newJoinKeys);
    };

    const handleKeyChange2 = (index: number, value: string) => {
        const newJoinKeys = [...joinKeys2];
        newJoinKeys[index] = value;
        setJoinKeys2(newJoinKeys);
    };

    const addJoinKey = () => {
        setJoinKeys1([...joinKeys1, '']);
        setJoinKeys2([...joinKeys2, '']);
    };

    const applyJoin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData1 || !parentData2 || joinKeys1.includes('') || joinKeys2.includes('')) {
            console.log('Please select all keys and ensure both datasets are connected');
            return;
        }

        const result = innerJoin(parentData1, parentData2, joinKeys1, joinKeys2);
        dispatch(setNodeData({id, data: result}));
        dispatch(setNodeState({id, data: {joinKeys1, joinKeys2}}));
    };

    return (
        <>
            {!parentData1 || !parentData2 ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Merge</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column name:</label>
                        <select className="bg-gray-800 text-white rounded-md p-2">
                            <option value="">← connect dataset...</option>
                        </select>
                    </div>
                    <Handle type="target" position={Position.Left} id="a" style={{top: '30%'}}
                            className="w-2 h-2 bg-gray-500 rounded-full"/>
                    <Handle type="target" position={Position.Left} id="b" style={{top: '70%'}}
                            className="w-2 h-2 bg-gray-500 rounded-full"/>
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Merge</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <form onSubmit={applyJoin}>
                        {joinKeys1.map((key, index) => (
                            <div className="flex flex-col mb-4" key={index}>
                                <label className="text-gray-400 mb-2">Join Key from Dataset 1:</label>
                                <select
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={key}
                                    onChange={(e) => handleKeyChange1(index, e.target.value)}
                                >
                                    <option value="">Select Key</option>
                                    {Object.keys(parentData1[0] || {}).map(column => (
                                        <option key={column} value={column}>
                                            {column}
                                        </option>
                                    ))}
                                </select>
                                <label className="text-gray-400 mb-2">Join Key from Dataset 2:</label>
                                <select
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={joinKeys2[index]}
                                    onChange={(e) => handleKeyChange2(index, e.target.value)}
                                >
                                    <option value="">Select Key</option>
                                    {Object.keys(parentData2[0] || {}).map(column => (
                                        <option key={column} value={column}>
                                            {column}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
                            onClick={addJoinKey}
                        >
                            + Add Key
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Apply Join
                        </button>
                        <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full"/>
                    </form>
                </div>
            )}
            <Handle type="target" position={Position.Left} id="a" style={{top: '30%'}}
                    className="w-2 h-2 bg-gray-500 rounded-full"/>
            <Handle type="target" position={Position.Left} id="b" style={{top: '70%'}}
                    className="w-2 h-2 bg-gray-500 rounded-full"/>
        </>
    );
}
export default  MergeNode