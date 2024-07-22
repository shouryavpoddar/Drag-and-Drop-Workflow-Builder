import {Handle, NodeProps, Position} from "reactflow";
import React, {useState} from "react";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import {CsvData} from "../../../../../App";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";

const mutateColumn = (data: CsvData, column: string, operation: string, constant: number, pattern?: string, replacement?: string): CsvData => {
    if (!data || !column || !operation) return data;

    return data.map(row => {
        const updatedRow = { ...row };
        if (updatedRow[column]) {
            if (operation === 'regex' && pattern && replacement) {
                const regex = new RegExp(pattern, 'g');
                updatedRow[column] = updatedRow[column]!.toString().replace(regex, "");
            } else {
                // const value = parseFloat(updatedRow[column]?.toString());
                // switch (operation) {
                //     case 'add':
                //         updatedRow[column] = value + constant;
                //         break;
                //     case 'subtract':
                //         updatedRow[column] = value - constant;
                //         break;
                //     case 'multiply':
                //         updatedRow[column] = value * constant;
                //         break;
                //     case 'divide':
                //         updatedRow[column] = value / constant;
                //         break;
                //     default:
                //         break;
                // }
            }
        }
        return updatedRow;
    });
};

const MutateNode = ({ id, data }: NodeProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [selectedColumn, setSelectedColumn] = useState<string>(data?.selectedColumn || '');
    const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'regex'>(data?.operation || 'add');
    const [constant, setConstant] = useState<number>(data?.constant || 0);
    const [pattern, setPattern] = useState<string>(data?.pattern || '');
    const [replacement, setReplacement] = useState<string>(data?.replacement || '');

    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    };

    const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOperation(event.target.value as 'add' | 'subtract' | 'multiply' | 'divide' | 'regex');
    };

    const handleConstantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConstant(parseFloat(event.target.value));
    };

    const handlePatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPattern(event.target.value);
    };

    const handleReplacementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplacement(event.target.value);
    };

    const applyMutation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || !selectedColumn) {
            console.log('Please select a column and set all fields');
            return;
        }

        let result: CsvData = [];
        if (operation === 'regex') {
            result = mutateColumn(parentData, selectedColumn, operation, 0, pattern, replacement);
        } else {
            result = mutateColumn(parentData, selectedColumn, operation, constant);
        }

        dispatch(setNodeData({ id, data: result }));
        dispatch(setNodeState({ id, data: { selectedColumn, operation, constant, pattern, replacement } }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Mutate Column</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={applyMutation}>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={selectedColumn}
                            onChange={handleColumnChange}
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
                        <label className="text-gray-400 mb-2">Operation:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={operation}
                            onChange={handleOperationChange}
                        >
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                            <option value="multiply">Multiply</option>
                            <option value="divide">Divide</option>
                            <option value="regex">Regex Replace</option>
                        </select>
                    </div>
                    {operation === 'regex' ? (
                        <>
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Pattern:</label>
                                <input
                                    type="text"
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={pattern}
                                    onChange={handlePatternChange}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Replacement:</label>
                                <input
                                    type="text"
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={replacement}
                                    onChange={handleReplacementChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Constant:</label>
                            <input
                                type="number"
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={constant}
                                onChange={handleConstantChange}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Apply
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

export default MutateNode