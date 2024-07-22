import {CsvData} from "../../../../../App";
import {Handle, NodeProps, Position} from "reactflow";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import {useState} from "react";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const pivotLonger = (data: CsvData, colsToPivot: string[], namesTo: string, valuesTo: string): CsvData => {
    if (!data || !colsToPivot.length || !namesTo || !valuesTo) return [];

    const pivotedData: CsvData = [];

    data.forEach(row => {
        colsToPivot.forEach(col => {
            const newRow = {
                ...row,
                [namesTo]: col,
                [valuesTo]: row[col]
            };
            delete newRow[col];
            pivotedData.push(newRow);
        });
    });

    return pivotedData;
};

const PivotNode = ({ id, data }: NodeProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [colsToPivot, setColsToPivot] = useState<string[]>(data?.colsToPivot || []);
    const [namesTo, setNamesTo] = useState(data?.namesTo || '');
    const [valuesTo, setValuesTo] = useState(data?.valuesTo || '');

    const handleColsToPivotChange = (index: number, value: string) => {
        const newColsToPivot = [...colsToPivot];
        newColsToPivot[index] = value;
        setColsToPivot(newColsToPivot);
    };

    const addColToPivot = () => {
        setColsToPivot([...colsToPivot, '']);
    };

    const handleNamesToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamesTo(event.target.value);
    };

    const handleValuesToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesTo(event.target.value);
    };

    const pivotData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || colsToPivot.includes('') || !namesTo || !valuesTo) {
            console.log('Please fill all pivot fields');
            return;
        }

        const result = pivotLonger(parentData, colsToPivot, namesTo, valuesTo);
        console.log(result)
        dispatch(setNodeData({ id, data: result }));
        dispatch(setNodeState({ id, data: { colsToPivot, namesTo, valuesTo } }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Pivot Data</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={pivotData}>
                    {colsToPivot.map((col, index) => (
                        <div className="flex flex-col mb-4" key={index}>
                            <label className="text-gray-400 mb-2">Column to Pivot:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={col}
                                onChange={(e) => handleColsToPivotChange(index, e.target.value)}
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
                    <button
                        type="button"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
                        onClick={addColToPivot}
                    >
                        + Add Column to Pivot
                    </button>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Names To:</label>
                        <input
                            type="text"
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={namesTo}
                            onChange={handleNamesToChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Values To:</label>
                        <input
                            type="text"
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={valuesTo}
                            onChange={handleValuesToChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Pivot
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

export default PivotNode;