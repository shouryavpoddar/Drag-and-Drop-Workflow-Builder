import React from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AddBlockModal from "../Components/AddBlockModal";
import InputNode from "../Components/CustomInputNode";
import { FilterNode, SliceNode, SortNode } from "../Components/CustomTransfromationNodes";
import { useDispatch, useSelector } from "react-redux";
import { onEdgesChange, onNodesChange, onConnect } from "../StateMangement/flowSlice";
import DataTable from "../Components/DataTable";
import OutputNode from "../Components/CustomOutputNode";
import { outputPanelClose, outputPanelOpen } from "../StateMangement/outputSlice";
import { CSVLink } from "react-csv";

const nodeTypes = {
    inputNode: InputNode,
    filterNode: FilterNode,
    sortNode: SortNode,
    sliceNode: SliceNode,
    outputNode: OutputNode,
};

export default function Canvas() {
    const dispatch = useDispatch();
    const { nodes, edges } = useSelector(state => state.flow);
    const isOutputVisible = useSelector(state => state.output.show);
    const data = useSelector(state => state.output.data);

    const toggleOutputVisibility = () => {
        dispatch(isOutputVisible ? outputPanelClose() : outputPanelOpen());
    };


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
        <>
            <div className={'w-full h-[75vh]'}>
                <div className={'w-full border-b h-[10%]'}>
                    <button className={'ml-3 hover:bg-slate-100 outline outline-1 shadow mt-2 space-y-2 p-1 items-center rounded-lg'}>Dashboard</button>
                    <button className={'ml-3 hover:bg-slate-100 outline outline-1 shadow mt-2 space-y-2 p-1 items-center rounded-lg'}>Save</button>
                </div>
                <div className={'w-full h-[90%]'}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={(e) => dispatch(onNodesChange(e))}
                        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
                        onConnect={(e) => dispatch(onConnect(e))}
                    >
                        <Panel position={"top-left"}><AddBlockModal /></Panel>
                        <Controls />
                        <MiniMap />
                        <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>
                </div>
            </div>
            <div className={'border w-full'}>
                <div className={'border border-black'}>
                    <div className="flex justify-between items-center p-2 bg-gray-100 border-b border-black">
                        <div>Output</div>
                        <div className="flex space-x-2">
                            { data && <CSVLink filename={"data"} data={data} className="px-2 py-1 border shadow rounded">Export CSV</CSVLink>}
                            {data && <button onClick={exportToJSON} className="px-2 py-1 border shadow rounded">Export JSON</button>}
                            <button onClick={toggleOutputVisibility} className="px-2 py-1 border shadow rounded">
                                {isOutputVisible ? 'Collapse' : 'Expand'}
                            </button>
                        </div>
                    </div>
                    {isOutputVisible && (
                        <div className={'border border-black h-[170px] overflow-y-hidden'}>
                            <DataTable data={data} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}