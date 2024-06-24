import { createSlice } from '@reduxjs/toolkit';
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';

const initialState = {
    nodes: [],
    edges: [],
};

const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        addInputNode(state, action) {
            state.nodes = [...state.nodes, {
                id: `${Date.now()}`,
                data: action.payload,
                position: { x: 100, y: 200 },
                type: 'inputNode',
            }];
        },
        addFilterNode(state, action) {
            state.nodes = [...state.nodes, {
                id: `${Date.now()}`,
                data: undefined,
                position: { x: 100, y: 200 },
                type: 'filterNode',
            }];
        },
        addSortNode(state, action) {
            state.nodes = [...state.nodes, {
                id: `${Date.now()}`,
                data: undefined,
                position: { x: 100, y: 200 },
                type: 'sortNode',
            }];
        },
        addSliceNode(state, action) {
            state.nodes = [...state.nodes, {
                id: `${Date.now()}`,
                data: undefined,
                position: { x: 100, y: 200 },
                type: 'sliceNode',
            }];
        },
        addOutputNode(state, action) {
            state.nodes = [...state.nodes, {
                id: `${Date.now()}`,
                data: undefined,
                position: { x: 100, y: 200 },
                type: 'outputNode',
            }];
        },
        onNodesChange: (state, action) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        setNodeData: (state, action) => {
            const { id, data } = action.payload;
            state.nodes = state.nodes.map(node => {
                if (node.id === id) {
                    return {
                        ...node,
                        data,
                    };
                }
                return node;
            });
        },
        onEdgesChange: (state, action) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        onConnect: (state, action) => {
            state.edges = addEdge(action.payload, state.edges);
        },
        deleteNode: (state, action) => {
            const nodeId = action.payload;
            state.nodes = state.nodes.filter(node => node.id !== nodeId);
            state.edges = state.edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
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
    addOutputNode,
    deleteNode,
} = flowSlice.actions;

export default flowSlice.reducer;