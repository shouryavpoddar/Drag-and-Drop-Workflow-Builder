import React, { Children, createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ onChange = (screenIndex) => {}, defaultScreen = 0, children, ...restProps }) {
    const [selectedScreen, setSelectedScreen] = useState(defaultScreen);
    const [screenIndices, setScreenIndices] = useState([]);

    useEffect(() => {
        onChange(selectedScreen);
    }, [selectedScreen]);

    return (
        <SidebarContext.Provider value={{ selectedScreen, setSelectedScreen, screenIndices, setScreenIndices }}>
            {children}
        </SidebarContext.Provider>
    );
}

Sidebar.Bar = function SidebarBar({ children, ...restProps }) {
    return (
        <div className="absolute top-0 left-0 z-40 w-64 h-[80vh] bg-gray-800" {...restProps}>
            <div className="h-full px-3 py-4">
                {children}
            </div>
        </div>
    );
}

Sidebar.ItemList = function SidebarItemList({ children, ...restProps }) {
    const { setScreenIndices } = useContext(SidebarContext);

    useEffect(() => {
        const indices = Children.map(children, (child, index) => child.props.screenIndex ?? index);
        setScreenIndices(indices);
    }, [children, setScreenIndices]);

    const childrenWithIndex = Children.map(children, (child, index) =>
        React.cloneElement(child, { screenIndex: child.props.screenIndex ?? index })
    );

    return (
        <ul className="space-y-2 font-medium" {...restProps}>
            {childrenWithIndex}
        </ul>
    );
}

Sidebar.Item = function SidebarItem({ screenIndex, children, ...restProps }) {
    const { selectedScreen, setSelectedScreen } = useContext(SidebarContext);

    const handleClick = () => {
        setSelectedScreen(screenIndex);
    }

    const isActive = selectedScreen === screenIndex;

    return (
        <li onClick={handleClick}
            className={` left-10 flex items-center p-2 rounded-lg ${isActive ? "bg-white text-black" : "text-white hover:bg-gray-700"} group`}
            {...restProps}>
            {children}
        </li>
    );
};

Sidebar.Body = function SidebarBody({ children, ...restProps }) {
    const { screenIndices } = useContext(SidebarContext);

    const childrenWithIndex = Children.map(children, (child, index) =>
        React.cloneElement(child, { screenIndex: child.props.screenIndex ?? screenIndices[index] })
    );

    return (
        <div className="sm:ml-64" {...restProps}>
            {childrenWithIndex}
        </div>
    );
}

Sidebar.Screen = function SidebarScreen({ screenIndex, children, ...restProps }) {
    const { selectedScreen } = useContext(SidebarContext);
    const isActive = selectedScreen === screenIndex;

    return (
        <div className={isActive ? "rounded-lg overflow-y-scroll h-[80vh]" : "hidden"} {...restProps}>
            {children}
        </div>
    );
}

Sidebar.CollapsibleSection = function SidebarCollapsibleSection({ title, children, ...restProps }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div {...restProps}>
            <button onClick={toggleOpen}
                    className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group w-full">
                {title}  &nbsp;
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {isOpen && (
                <div className="pl-4">
                    {children}
                </div>
            )}
        </div>
    );
};