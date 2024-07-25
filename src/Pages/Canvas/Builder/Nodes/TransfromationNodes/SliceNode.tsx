import {useEffect, useState} from "react";
import {Handle, NodeProps, Position} from "reactflow";
import {AppDispatch} from "../../../../../StateMangement/store";
import {useDispatch} from "react-redux";
import useParentData from "../../../../../hooks/UseParentData";
import {setNodeData} from "../../../../../StateMangement/Slices/nodesDataSlice";
import {deleteNode, setNodeState} from "../../../../../StateMangement/Slices/flowSlice";

const SliceNode = (props: NodeProps) => {
    const { id, data } = props
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id);
    const [fromIndex, setFromIndex] = useState(data?.fromIndex || 0);
    const [toIndex, setToIndex] = useState(data?.toIndex || 0);

    const handleFromIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromIndex(event.target.valueAsNumber);
    };

    useEffect(() => {
        if (parentData) {
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
        dispatch(setNodeState({ id, data: { fromIndex, toIndex } }));
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
                        onChange={(event) => { setToIndex(event.target.valueAsNumber) }}
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

export default SliceNode;