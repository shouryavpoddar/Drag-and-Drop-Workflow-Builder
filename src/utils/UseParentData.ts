import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../StateMangement/store'; // Adjust the import based on your project structure
import { Edge, Node } from 'reactflow';
import { CsvData } from '../App';
import { selectNodeDataById } from '../StateMangement/nodesDataSlice'; // Adjust the import based on your project structure

interface FlowState {
    nodes: Node[];
    edges: Edge[];
}

const identifyParents = (edges: Edge[], id: string): string[] => {
    const edge = edges.filter(edge => edge.target === id);
    if (edge.length > 0) {
        return edge.map(e => e.source);
    }
    console.log('No parent found');
    return [];
};

const useParentData = (id: string): (CsvData | null)[] => {
    const { edges } = useSelector((state: RootState) => state.flow as FlowState);
    const [parentIds, setParentIds] = useState<string[]>([]);


    const parentData = useSelector((state: RootState) =>
        parentIds.map(parentId => selectNodeDataById(state, parentId))
    );

    useEffect(() => {
        const parents = identifyParents(edges, id);
        setParentIds(parents);
    }, [edges, id]);

    return parentData;
};

export default useParentData;