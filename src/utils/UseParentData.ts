import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../StateMangement/store'; // Adjust the import based on your project structure
import { Edge, Node } from 'reactflow';
import {CsvData} from "../App"; // Adjust the import based on your project structure


interface FlowState {
    nodes: Node[];
    edges: Edge[];
}


const useParentData = (id: string) : CsvData[] | null[] => {
    const { nodes, edges } = useSelector((state: RootState) => state.flow as FlowState);
    const [data, setData] = useState<CsvData[] | null[]>([null]);


    const identifyParents = (edges: Edge[], nodes: Node[], id: string): Node[] | null => {
        const edge = edges.filter(edge => edge.target === id);
        if (edge.length > 0) {
            // will be able to get both edges that run into the merge node
            const sourceIds  = edge.map(e => e.source);
            return nodes.filter(node => node.id === sourceIds[0] || node.id === sourceIds[1]);
        }
        console.log('No parent found');
        return null;
    };


    useEffect(() => {
        const parent = identifyParents(edges, nodes, id);
        if (parent) {
            if(parent.length > 1){
                setData([
                    parent[0].data,
                    parent[1].data
                ])
            } else{
                setData([parent[0].data]);
            }
        }
    }, [edges, nodes, id]);


    return data;
};


export default useParentData;