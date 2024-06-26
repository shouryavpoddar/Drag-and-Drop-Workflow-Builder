
import React, {useEffect, useState} from 'react';
import {Handle, NodeProps, Position,} from 'reactflow';
import {useDispatch,} from 'react-redux';
import {deleteNode, setNodeData} from "../StateMangement/flowSlice";
import useParentData from "../utils/UseParentData";
// @ts-ignore
import {CsvData, CsvRow, CustomData} from "../App";
import {AppDispatch} from "../StateMangement/store";


export const FilterNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const parentData: CsvData | null= useParentData(id)
    const [selectedColumn, setSelectedColumn] = useState('Select Column');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('Select condition');


    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if(event) {
            setSelectedColumn(event.target.value);
        }
    };


    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedCondition(event.target.value);
    };


    const runFilter = (event:  React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!selectedColumn || !selectedCondition || !parentData || !selectedValue) {
            console.log('Please select column, condition and value');
            return;
        }
        const filtered: CsvData = parentData.filter( (item: CsvRow): boolean => {
            const value = item[selectedColumn];
            if(value) {
                switch (selectedCondition) {
                    case '==':
                        return value == selectedValue;
                    case '!=':
                        return value != selectedValue;
                    case '>':
                        return value > selectedValue;
                    case '>=':
                        return value >= selectedValue;
                    case '<':
                        return value < selectedValue;
                    case '<=':
                        return value <= selectedValue;
                    default:
                        return true;
                }
            }
            return false;
        });
        console.log('Filtered Data:', filtered);
        dispatch(setNodeData({ id, data: filtered }));
    };


    return (
        <>
            {!parentData ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Filter</h3>
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
                    <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Filter</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <form onSubmit={runFilter}>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Column name:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedColumn}
                                onChange={handleColumnChange}
                            >
                                {Object.keys(parentData[0]).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Condition:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedCondition}
                                onChange={handleConditionChange}
                            >
                                <option value="">Select condition</option>
                                <option value="==">Equal (==)</option>
                                <option value="!=">Not Equal (!=)</option>
                                <option value=">">Greater Than (&g;t)</option>
                                <option value=">=">Greater Than or Equal (&gt;=)</option>
                                <option value="<">Less Than (&lt;)</option>
                                <option value="<=">Less Than or Equal (&lt;=)</option>
                            </select>
                        </div>
                        {selectedCondition !== 'Select condition' && (
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Value:</label>
                                <input
                                    type="text"
                                    value={selectedValue}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    placeholder="Enter value..."
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Run
                        </button>
                    </form>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    {<Handle
                        type="source"
                        position={Position.Right}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />}
                </div>
            )}
        </>
    );
};


export const SliceNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const parentData = useParentData(id);
    const [fromIndex, setFromIndex] = useState(0);
    const [toIndex, setToIndex] = useState( 0);


    const handleFromIndexChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setFromIndex(event.target.valueAsNumber);
    };


    useEffect(() => {
        if(parentData){
            setToIndex(parentData.length);
        }
    }, [parentData]);


    const runSlice = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!parentData) {
            console.log('Please connect dataset');
            return;
        }


        if (fromIndex < 0 || toIndex > parentData.length || fromIndex >= toIndex) {
            console.log('Please select valid indices');
            return;
        }


        const slicedData = parentData.slice(fromIndex, toIndex);
        console.log('Sliced Data:', slicedData);
        dispatch(setNodeData({ id, data: slicedData }));
    };


    return (
        (!parentData ? (
            <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Slice</h3>
                    <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col mb-4">
                    <select className="bg-gray-800 text-white rounded-md p-2">
                        <option value="">← connect dataset...</option>
                    </select>
                </div>
                <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
            </div>
        ) : <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Slice</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            <form onSubmit={runSlice}>
                <div className="flex flex-col mb-4">
                    <label className="nodrag text-gray-400 mb-2">From index:</label>
                    <input
                        type="number"
                        value={fromIndex}
                        onChange={handleFromIndexChange}
                        className="bg-gray-800 text-white rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="nodrag text-gray-400 mb-2">To index:</label>
                    <input
                        type="number"
                        placeholder={parentData.length.toString()}
                        value={toIndex}
                        onChange={(event)=>{setToIndex(event.target.valueAsNumber)}}
                        className="bg-gray-800 text-white rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full"
                >
                    Run
                </button>
            </form>
            <Handle
                type="target"
                position={Position.Left}
                className="w-2 h-2 bg-gray-500 rounded-full"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 bg-gray-500 rounded-full"
            />
        </div>)
    );
};


export const SortNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const parentData: CsvData | null = useParentData(id);
    const [selectedColumn, setSelectedColumn] = useState('Select Column');
    const [selectedCondition, setSelectedCondition] = useState('Select condition');


    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    };


    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCondition(event.target.value);
    };


    const runSort = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!selectedColumn || !selectedCondition || !parentData) {
            console.log('Please select column and condition');
            return;
        }


        const sorted: CsvData = [...parentData].sort((a: CsvRow, b: CsvRow): number => {
            const valueA = a[selectedColumn];
            const valueB = b[selectedColumn];
            if(valueA && valueB){
                if (selectedCondition === 'Ascen') {
                    return valueA > valueB ? 1 : -1;
                } else if (selectedCondition === 'Descen') {
                    return valueA < valueB ? 1 : -1;
                }
            }
            return 0;
        });


        dispatch(setNodeData({ id, data: sorted }));
    };


    return (
        <>
            {!parentData ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Sort</h3>
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
                    <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Sort</h3>
                        <button onClick={() => dispatch(deleteNode(id))}  className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <form onSubmit={runSort}>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Column name:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedColumn}
                                onChange={handleColumnChange}
                            >
                                {Object.keys(parentData[0]).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Condition:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedCondition}
                                onChange={handleConditionChange}
                            >
                                <option value="">Select condition</option>
                                <option value="Ascen">Ascending</option>
                                <option value="Descen">Descending</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Run
                        </button>
                    </form>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                </div>
            )}
        </>
    );
};
