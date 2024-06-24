import { useEffect, useState } from 'react';
import {useSelector} from "react-redux";

const useParentData = (id) => {
    const { nodes, edges } = useSelector(state => state.flow);
    const [data, setData] = useState(null);

    const identifyParent = (edges, nodes, id) => {
        const edge = edges.filter(edge => edge.target === id);
        if (edge.length > 0) {
            const sourceId = edge[0].source;
            return nodes.find(node => node.id === sourceId);
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