import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../StateMangement/store'; // Adjust the import based on your project structure
import { Edge, Node } from 'reactflow';
import {CsvData} from "../App"; // Adjust the import based on your project structure


interface FlowState {
    nodes: Node[];
    edges: Edge[];
}


const useParentData = (id: string) : CsvData | null => {
    const { nodes, edges } = useSelector((state: RootState) => state.flow as FlowState);
    const [data, setData] = useState<any | null>(null);


    const identifyParent = (edges: Edge[], nodes: Node[], id: string): Node | null => {
        const edge = edges.filter(edge => edge.target === id);
        if (edge.length > 0) {
            const sourceId = edge[0].source;
            return nodes.find(node => node.id === sourceId) || null;
        }
        console.log('No parent found');
        return null;
    };


    useEffect(() => {
        const parent = identifyParent(edges, nodes, id);
        if (parent) {
            setData(parent.data);
        }
    }, [edges, nodes, id]);


    return data;
};


export default useParentData;