import React, { useState} from 'react';
import {Handle, NodeProps, Position,} from 'reactflow';
import {useDispatch,} from 'react-redux';
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import useParentData from "../../../../../hooks/UseParentData";
import {CsvData} from "../../../../../App";
import {AppDispatch} from "../../../../../StateMangement/store";

const renameColumn = (data: CsvData, oldColumnName: string, newColumnName: string): CsvData => {
    if (!data || !oldColumnName || !newColumnName) return data;

    return data.map(row => {
        const newRow = { ...row };
        newRow[newColumnName] = newRow[oldColumnName];
        delete newRow[oldColumnName];
        return newRow;
    });
};

const RenameNode = ({ id, data }: NodeProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [oldColumnName, setOldColumnName] = useState<string>(data?.oldColumnName || '');
    const [newColumnName, setNewColumnName] = useState<string>(data?.newColumnName || '');

    const handleOldColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOldColumnName(event.target.value);
    };

    const handleNewColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnName(event.target.value);
    };

    const applyRename = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || !oldColumnName || !newColumnName) {
            console.log('Please select a column and set a new name');
            return;
        }

        const result = renameColumn(parentData, oldColumnName, newColumnName);
        dispatch(setNodeData({ id, data: result }));
        dispatch(setNodeState({ id, data: { oldColumnName, newColumnName } }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Rename Column</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={applyRename}>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Old Column Name:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={oldColumnName}
                            onChange={handleOldColumnChange}
                        >
                            <option value="">Select Column</option>
                            {Object.keys(parentData[0] || {}).map(column => (
                                <option key={column} value={column}>
                                    {column}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">New Column Name:</label>
                        <input
                            type="text"
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={newColumnName}
                            onChange={handleNewColumnChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Apply Rename
                    </button>
                    <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
                </form>
            ) : (
                <div className="text-gray-500">Please connect dataset...</div>
            )}
            <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );
};

export default RenameNode
