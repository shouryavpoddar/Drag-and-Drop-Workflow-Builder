import {CsvData, CsvRow} from "../../../../../App";
import {Handle, NodeProps, Position} from "reactflow";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import React, {useState} from "react";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const removeColumnsFromDataset = (data: CsvData, columns: string[]): CsvData => {
    if (!data || !columns.length) return [];

    return data.map(row => {
        const updatedRow = { ...row };
        columns.forEach(column => {
            delete updatedRow[column];
        });
        return updatedRow;
    });
};

const keepColumnsInDataset = (data: CsvData, columns: string[]): CsvData => {
    if (!data || !columns.length) return [];

    return data.map(row => {
        const updatedRow: CsvRow = {};
        columns.forEach(column => {
            if (row[column] !== undefined) {
                updatedRow[column] = row[column];
            }
        });
        return updatedRow;
    });
};

const RemoveColumnsNode = (props: NodeProps) => {
    const { id, data } = props;
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [selectedColumns, setSelectedColumns] = useState<string[]>(data?.selectedColumns || ['']);
    const [operation, setOperation] = useState<'keep' | 'remove'>(data?.operation || 'keep');

    const handleColumnChange = (index: number, value: string) => {
        const newSelectedColumns = [...selectedColumns];
        newSelectedColumns[index] = value;
        setSelectedColumns(newSelectedColumns);
    };

    const addColumnSelect = () => {
        setSelectedColumns([...selectedColumns, '']);
    };

    const executeOperation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || selectedColumns.includes('')) {
            console.log('Please select all columns');
            return;
        }

        let result: CsvData = [];
        if (operation === 'keep') {
            result = keepColumnsInDataset(parentData, selectedColumns);
        } else if (operation === 'remove') {
            result = removeColumnsFromDataset(parentData, selectedColumns);
        }

        dispatch(setNodeData({ id, data: result }));
        dispatch(setNodeState({ id, data: { selectedColumns, operation } }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Column Selector</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={executeOperation}>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Operation:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={operation}
                            onChange={(e) => setOperation(e.target.value as 'keep' | 'remove')}
                        >
                            <option value="keep">Keep Columns</option>
                            <option value="remove">Remove Columns</option>
                        </select>
                    </div>
                    {selectedColumns.map((selectedColumn, index) => (
                        <div className="flex flex-col mb-4" key={index}>
                            <label className="text-gray-400 mb-2">Column name:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedColumn}
                                onChange={(e) => handleColumnChange(index, e.target.value)}
                            >
                                <option value="">Select Column</option>
                                {Object.keys(parentData[0] || {}).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between w-full">
                        <button
                            type="button"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
                            onClick={addColumnSelect}
                        >
                            + Add Column
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
                        >
                            {operation === 'keep' ? 'Keep' : 'Remove'}
                        </button>
                    </div>
                    <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
                </form>
            ) : (
                <div className="text-gray-500">Please connect dataset...</div>
            )}
            <Handle type="target"  position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>)
        }

export default RemoveColumnsNode;