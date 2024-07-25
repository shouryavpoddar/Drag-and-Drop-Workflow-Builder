import NodeSelectionComponent from "./NodeSelectionComponent";
import React from "react";

const TransformationNodesSection =()=>{
    return(
        <>
        <NodeSelectionComponent
            title="Filter"
            description="Groups a data set based on a given column name."
            input="Dataset"
            type={'filterNode'}
            output="Dataset"
        />
        <NodeSelectionComponent
            title="Pivot"
            description="Groups a data set based on a given column name."
            input="Dataset"
            type="pivotNode"
            output="Dataset"
        />
        <NodeSelectionComponent
            title="Mutate"
            description="Groups a data set based on a given column name."
            input="Dataset"
            type="mutateNode"
            output="Dataset"
        />
        <NodeSelectionComponent
            title="Delete Column"
            description="Delets a Column from the data set based on given column names."
            input="Dataset"
            type="removeColumnsNode"
            output="Dataset"
        />
        <NodeSelectionComponent title={"Merge"} description={"Merge Two data sets"} output={"One merged data set"} type="mergeNode"/>
        <NodeSelectionComponent
            title="Sort"
            description="Sort data sets based on the given column names."
            input="Dataset, Geojon"
            type="sortNode"
            output="Dataset"
        />
        <NodeSelectionComponent
            title="Slice"
            description="Slice a data set based on a given indices."
            input="Dataset, Geojon"
            output="Dataset"
            type="sliceNode"
        />
        <NodeSelectionComponent
            title="Rename"
            description="Slice a data set based on a given indices."
            input="Dataset, Geojon"
            output="Dataset"
            type="renameColumnsNode"
        />
        </>
    )
}

export default TransformationNodesSection;