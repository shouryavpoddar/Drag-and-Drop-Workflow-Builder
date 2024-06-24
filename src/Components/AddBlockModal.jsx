import React from "react";
import Modal from 'react-modal';
import Sidebar from "./Sidebar";
import NodeSelectionComponent from "./NodeSelectionComponent";
import {useDispatch, useSelector} from "react-redux";
import {modalClose, modalOpen} from "../StateMangement/modalSlice";
import {addFilterNode, addOutputNode, addSliceNode, addSortNode} from "../StateMangement/flowSlice";

Modal.setAppElement("#root");

const AddBlockModal = () => {
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.modal.open);

    const openModal = () => {
        dispatch(modalOpen());
    };

    const closeModal = () => {
        dispatch(modalClose());
    };

    return (
        <div>
            <button onClick={openModal} className=" hover:bg-slate-100 bg-white outline outline-1 shadow p-1 rounded-3xl">+ block</button>
            <Modal
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border-none p-0 w-4/5 h-auto"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Block"
            >
                <div>
                    <Sidebar defaultScreen="All">
                        <Sidebar.Bar>
                            <Sidebar.ItemList>
                                <Sidebar.Item screenIndex="All">All</Sidebar.Item>
                                <Sidebar.Item screenIndex="Input">Input</Sidebar.Item>
                                <Sidebar.Item screenIndex="Transform">Transform</Sidebar.Item>
                                <Sidebar.Item screenIndex="Output">Output</Sidebar.Item>
                            </Sidebar.ItemList>
                        </Sidebar.Bar>
                        <Sidebar.Body>
                            <Sidebar.Screen screenIndex="All">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold">INPUT</div>
                                    <NodeSelectionComponent
                                        title="File"
                                        data={'./Data/bikeshare_day.csv'}
                                        description="Bike Share data set"
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="File"
                                        data={'./Data/Final.csv'}
                                        description="Mobile users data set"
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="HTTP Request"
                                        description="Loads data via a http request."
                                        input="Dataset, Array"
                                        output="Dataset, Object, Geojon"
                                    />
                                    <NodeSelectionComponent
                                        title="Sheets"
                                        description="Loads data from google sheets."
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Example Data"
                                        description="Some example data for playing around with data blocks."
                                        input="Dataset, Array"
                                        output="Dataset, Geojon"
                                    />
                                    <div className="col-span-3 text-xl font-bold mt-8">TRANSFORM</div>
                                    <NodeSelectionComponent
                                        title="Filter"
                                        description="Groups a data set based on a given column name."
                                        input="Dataset"
                                        addNodeFunction={addFilterNode}
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Sort"
                                        description="Sort data sets based on the given column names."
                                        input="Dataset, Geojon"
                                        addNodeFunction={addSortNode}
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Slice"
                                        description="Slice a data set based on a given indices."
                                        input="Dataset, Geojon"
                                        output="Dataset"
                                        addNodeFunction={addSliceNode}
                                    />
                                    <div className="col-span-3 text-xl font-bold mt-8">Output</div>
                                    <NodeSelectionComponent
                                        title={"Output"}
                                        description={"Output data to a file"}
                                        input={"Dataset, Array"}
                                        output={"Dataset"}
                                        addNodeFunction={addOutputNode}
                                    />
                                </div>
                            </Sidebar.Screen>
                            <Sidebar.Screen screenIndex="Input">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold">INPUT</div>
                                    <NodeSelectionComponent
                                        title="File"
                                        data={'./Data/bikeshare_day.csv'}
                                        description="Bike Share data set"
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="File"
                                        data={'./Data/Final.csv'}
                                        description="Mobile users data set"
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="HTTP Request"
                                        description="Loads data via a http request."
                                        input="Dataset, Array"
                                        output="Dataset, Object, Geojon"
                                    />
                                    <NodeSelectionComponent
                                        title="Sheets"
                                        description="Loads data from google sheets."
                                        input="Dataset, Array"
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Example Data"
                                        description="Some example data for playing around with data blocks."
                                        input="Dataset, Array"
                                        output="Dataset, Geojon"
                                    />
                                </div>
                            </Sidebar.Screen>
                            <Sidebar.Screen screenIndex="Transform">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold mt-8">TRANSFORM</div>
                                    <NodeSelectionComponent
                                        title="Filter"
                                        description="Groups a data set based on a given column name."
                                        input="Dataset"
                                        addNodeFunction={addFilterNode}
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Sort"
                                        description="Sort data sets based on the given column names."
                                        input="Dataset, Geojon"
                                        addNodeFunction={addSortNode}
                                        output="Dataset"
                                    />
                                    <NodeSelectionComponent
                                        title="Slice"
                                        description="Slice a data set based on a given indices."
                                        input="Dataset, Geojon"
                                        output="Dataset"
                                        addNodeFunction={addSliceNode}
                                    />
                                </div>
                            </Sidebar.Screen>
                            <Sidebar.Screen screenIndex="Output">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold mt-8">Output</div>
                                    <NodeSelectionComponent
                                        title={"Output"}
                                        description={"Output data to a file"}
                                        input={"Dataset, Array"}
                                        output={"Dataset"}
                                        addNodeFunction={addOutputNode}
                                    />
                                </div>
                            </Sidebar.Screen>
                        </Sidebar.Body>
                    </Sidebar>
                </div>
            </Modal>
        </div>
);
}

export default AddBlockModal;