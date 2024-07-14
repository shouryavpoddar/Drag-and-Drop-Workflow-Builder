import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, Node, NodeChange, EdgeChange, Connection } from 'reactflow';
import { CsvData } from '../App'; // Adjust the path if necessary


interface FlowState {
    nodes: Node[];
    edges: Edge[];
}


const initialState: FlowState = {
    nodes: [],
    edges: [],
};


const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        addInputNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    position: { x: 100, y: 200 },
                    type: 'inputNode',
                } as Node,
            ];
        },
        addFilterNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'filterNode',
                } as Node,
            ];
        },
        addMergeNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'mergeNode',
                } as Node,
            ];
        },
        addSortNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'sortNode',
                } as Node,
            ];
        },
        addSliceNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'sliceNode',
                } as Node,
            ];
        },
        addPivotNode(state){
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'pivotNode',
                } as Node,
            ];
        },
        addMutateNode(state){
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'mutateNode',
                } as Node,
            ];
        },
        addRemoveColumnsNode(state) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: 'removeColumnsNode',
                } as Node,
            ];
        },
        onNodesChange(state, action: PayloadAction<NodeChange[]>) {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        setNodeData(state, action: PayloadAction<{ id: string; data: CsvData }>) {
            const { id, data } = action.payload;
            state.nodes = state.nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data };
                }
                return node;
            });
        },
        onEdgesChange(state, action: PayloadAction<EdgeChange[]>) {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        onConnect(state, action: PayloadAction<Connection | Edge>) {
            state.edges = addEdge(action.payload, state.edges);
        },
        deleteNode(state, action: PayloadAction<string>) {
            const nodeId = action.payload;
            state.nodes = state.nodes.filter((node) => node.id !== nodeId);
            state.edges = state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
        },
    },
});


export const {
    addSortNode,
    setNodeData,
    addInputNode,
    addFilterNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addSliceNode,
    addMergeNode,
    deleteNode,
    addRemoveColumnsNode,
    addPivotNode,
    addMutateNode,
} = flowSlice.actions;


export default flowSlice.reducer;