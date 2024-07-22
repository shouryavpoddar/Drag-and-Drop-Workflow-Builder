import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, Node, NodeChange, EdgeChange, Connection } from 'reactflow';
import { CsvData } from '../../App'; // Adjust the path if necessary

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
        addNode(state, action) {
            state.nodes = [
                ...state.nodes,
                {
                    id: `${Date.now()}`,
                    data: undefined,
                    position: { x: 100, y: 200 },
                    type: action.payload,
                } as Node,
            ];
        },
        onNodesChange(state, action: PayloadAction<NodeChange[]>) {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
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
        saveState(state) {
            const stateString = JSON.stringify(state);
            localStorage.setItem('flowState', stateString);
        },
        setNodeState(state, action: PayloadAction<{
            id: string,
            data:{[key: string]: string | string[] | number}}>
        ) {
            const { id, data } = action.payload;
            state.nodes = state.nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data };
                }
                return node;
            });
        },
        loadState(state) {
            const stateString = localStorage.getItem('flowState');
            if (stateString) {
                const loadedState = JSON.parse(stateString);
                state.nodes = loadedState.nodes;
                state.edges = loadedState.edges;
            }
        },
    },
});

export const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    addNode,
    saveState,
    loadState,
    setNodeState,
} = flowSlice.actions;

export default flowSlice.reducer;