import NodeSelectionComponent from "./NodeSelectionComponent";
import React from "react";

const inputNodesSelection = () => {
    return(
        <>
            <NodeSelectionComponent
                title="File"
                description="Bike Share data set"
                input="Dataset, Array"
                output="Dataset"
                type={'inputNode'}
            />
            <NodeSelectionComponent
                title="File"
                description="Mobile users data set"
                input="Dataset, Array"
                output="Dataset"
                type={'inputNode'}
            />
            <NodeSelectionComponent
                title="HTTP Request"
                description="Loads data via a http request."
                input="Dataset, Array"
                output="Dataset, Object, Geojon"
                type={'inputNode'}
            />
            <NodeSelectionComponent
                title="Sheets"
                description="Loads data from google sheets."
                input="Dataset, Array"
                output="Dataset"
                type={'inputNode'}
            />
            <NodeSelectionComponent
                title="Example Data"
                description="Some example data for playing around with data blocks."
                input="Dataset, Array"
                output="Dataset, Geojon"
                type={'inputNode'}
            />
        </>
    )
}

export default inputNodesSelection;