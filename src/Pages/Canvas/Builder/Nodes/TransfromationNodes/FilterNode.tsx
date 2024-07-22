import {Handle, NodeProps, Position} from "reactflow";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import React, {useState} from "react";
import {CsvData, CsvRow} from "../../../../../App";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const FilterNode = (props: NodeProps) => {
    const {id, data} = props;
    const dispatch: AppDispatch = useDispatch();
    const [parentData]= useParentData(id);
    const [selectedColumn, setSelectedColumn] = useState(data?.selectedColumn || 'Select Column');
    const [selectedValue, setSelectedValue] = useState(data?.selectedValue ||  '');
    const [selectedCondition, setSelectedCondition] = useState( data?.selectedCondition|| 'Select condition');

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
        dispatch(setNodeState({id, data: {"selectedColumn": selectedColumn, "selectedCondition": selectedCondition, "selectedValue": selectedValue}}));
    };

    const formChange= ( prams: React.FormEvent<HTMLFormElement>): void =>{
        console.log(prams)
    }


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
                    <form onSubmit={runFilter} onChange={formChange}>
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

export default FilterNode;