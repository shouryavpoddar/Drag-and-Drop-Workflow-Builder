// src/components/Builder.tsx
import React from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, Edge, MiniMap, Node, Panel } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { onConnect, onEdgesChange, onNodesChange } from '../../../StateMangement/Slices/flowSlice';
import { RootState } from '../../../StateMangement/store';
import AddBlockModal from './AddBlockModal';
import InputNode from '../../../Components/CustomInputNode';
import {
    FilterNode,
    MergeNode, MutateNode,
    PivotNode,
    RemoveColumnsNode, RenameNode,
    SliceNode,
    SortNode
} from './Nodes/CustomTransfromationNodes';

const nodeTypes = {
    inputNode: InputNode,
    filterNode: FilterNode,
    sortNode: SortNode,
    sliceNode: SliceNode,
    mergeNode: MergeNode,
    removeColumnsNode: RemoveColumnsNode,
    pivotNode: PivotNode,
    mutateNode: MutateNode,
    renameColumnsNode: RenameNode,
};

const Builder: React.FC<{ handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void; height: number }> = ({ handleMouseDown, height }) => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.flow.nodes);
    const edges = useSelector((state: RootState) => state.flow.edges);

    return (
        <div style={{ height: `${height}px` }} className="relative">
            <ReactFlow
                nodes={nodes as Node[]}
                edges={edges as Edge[]}
                nodeTypes={nodeTypes}
                onNodesChange={(e) => dispatch(onNodesChange(e))}
                onEdgesChange={(e) => dispatch(onEdgesChange(e))}
                onConnect={(e) => dispatch(onConnect(e))}
                className="bg-gray-800 h-full"
            >
                <Panel position={"top-left"}><AddBlockModal /></Panel>
                <Controls />
                <MiniMap className="bg-red-400" />
                <Background variant={BackgroundVariant.Dots} gap={12} />
            </ReactFlow>
            <div aria-label="resizer" role="presentation" onMouseDown={handleMouseDown} className="cursor-n-resize bg-[#5f7e97] absolute bottom-0 h-[2px] w-full hover:h-[3px]" />
        </div>
    );
}

export default Builder;