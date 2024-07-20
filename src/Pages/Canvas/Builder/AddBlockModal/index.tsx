import React from "react";
import Modal from 'react-modal';
import Sidebar from "../../../../Components/Sidebar";
import NodeSelectionComponent from "./NodeSelectionComponent";
import { useDispatch, useSelector } from "react-redux";
import { modalClose, modalOpen } from "../../../../StateMangement/Slices/modalSlice";
import {AppDispatch, RootState} from "../../../../StateMangement/store";
import TransformationNodesSection from "./TransformationNodesSection";
import InputNodesSelection from "./InputNodesSelection";

Modal.setAppElement("#root");

const Index = () => {
    const dispatch: AppDispatch  = useDispatch();
    const modalIsOpen = useSelector((state: RootState) => state.modal.open);

    const openModal = () => {
        dispatch(modalOpen());
    };

    const closeModal = () => {
        dispatch(modalClose());
    };

    return (
        <div>
            <button onClick={openModal} className="hover:bg-slate-100 bg-white outline outline-1 shadow p-1 rounded-3xl">+ block</button>
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
                            </Sidebar.ItemList>
                        </Sidebar.Bar>
                        <Sidebar.Body>
                            <Sidebar.Screen screenIndex="All">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold">INPUT</div>
                                    <InputNodesSelection />
                                    <div className="col-span-3 text-xl font-bold mt-8">TRANSFORM</div>
                                    <TransformationNodesSection />
                                </div>
                            </Sidebar.Screen>
                            <Sidebar.Screen screenIndex="Input">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold">INPUT</div>
                                    <InputNodesSelection />
                                    </div>
                            </Sidebar.Screen>
                            <Sidebar.Screen screenIndex="Transform">
                                <div className="grid grid-cols-3 gap-4 text-white rounded bg-gray-900 p-4">
                                    <div className="col-span-3 text-xl font-bold mt-8">TRANSFORM</div>
                                    <TransformationNodesSection />
                                </div>
                            </Sidebar.Screen>
                        </Sidebar.Body>
                    </Sidebar>
                </div>
            </Modal>
        </div>
);
}

export default Index;