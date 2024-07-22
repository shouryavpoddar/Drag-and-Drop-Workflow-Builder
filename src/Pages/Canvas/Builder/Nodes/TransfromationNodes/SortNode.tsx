import useParentData from "../../../../../hooks/UseParentData";
import {Handle, NodeProps, Position} from "reactflow";
import {CsvData, CsvRow} from "../../../../../App";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const SortNode = (props: NodeProps) => {
    const { id, data } = props;
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id);
    const [selectedColumn, setSelectedColumn] = useState(data?.selectedColumn || 'Select Column');
    const [selectedCondition, setSelectedCondition] = useState(data?.selectedCondition || 'Select condition');

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
            if (valueA && valueB) {
                if (selectedCondition === 'Ascen') {
                    return valueA > valueB ? 1 : -1;
                } else if (selectedCondition === 'Descen') {
                    return valueA < valueB ? 1 : -1;
                }
            }
            return 0;
        });

        console.log('Sorted Data:', sorted);

        dispatch(setNodeData({ id, data: sorted }));
        dispatch(setNodeState({ id, data: { selectedColumn, selectedCondition } }));
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
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
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

export default SortNode;