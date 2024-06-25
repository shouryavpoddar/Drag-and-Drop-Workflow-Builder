import React, {
    Children,
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    ReactElement,
    JSXElementConstructor
} from "react";

interface SidebarContextType {
    selectedScreen: number | string;
    setSelectedScreen: (screenIndex: number | string) => void;
    screenIndices: (number | string)[];
    setScreenIndices: (indices: (number | string)[]) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    onChange?: (screenIndex: number | string) => void;
    defaultScreen?: number | string;
    children: ReactNode;
    [restProps: string]: any;
}

const Sidebar: React.FC<SidebarProps> & { [key: string]: any } = ({
                                                                      onChange = () => {},
                                                                      defaultScreen = 0,
                                                                      children,
                                                                      ...restProps
                                                                  }) => {
    const [selectedScreen, setSelectedScreen] = useState<number | string>(defaultScreen);
    const [screenIndices, setScreenIndices] = useState<(number | string)[]>([]);

    useEffect(() => {
        onChange(selectedScreen);
    }, [selectedScreen, onChange]);

    return (
        <SidebarContext.Provider value={{ selectedScreen, setSelectedScreen, screenIndices, setScreenIndices }}>
            {children}
        </SidebarContext.Provider>
    );
}

interface SidebarBarProps {
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.Bar = function SidebarBar({ children, ...restProps }: SidebarBarProps) {
    return (
        <div className="absolute top-0 left-0 z-40 w-64 h-[80vh] bg-gray-800" {...restProps}>
            <div className="h-full px-3 py-4">
                {children}
            </div>
        </div>
    );
}

interface SidebarItemListProps {
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.ItemList = function SidebarItemList({ children, ...restProps }: SidebarItemListProps) {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar.ItemList must be used within a SidebarProvider");
    }
    const { setScreenIndices } = context;

    useEffect(() => {
        const indices = Children.map(children, (child, index) =>
            React.isValidElement(child) ? (child.props as { screenIndex?: number | string }).screenIndex ?? index : index
        ) as (number | string)[];
        setScreenIndices(indices);
    }, [children, setScreenIndices]);

    const childrenWithIndex = Children.map(children, (child: ReactNode, index) =>
        React.isValidElement(child) ? React.cloneElement((child), {...child.props,  screenIndex: (child.props as { screenIndex?: number | string }).screenIndex ?? index }) : child
    );

    return (
        <ul className="space-y-2 font-medium" {...restProps}>
            {childrenWithIndex}
        </ul>
    );
}

interface SidebarItemProps {
    screenIndex: number | string;
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.Item = function SidebarItem({ screenIndex, children, ...restProps }: SidebarItemProps) {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar.Item must be used within a SidebarProvider");
    }
    const { selectedScreen, setSelectedScreen } = context;

    const handleClick = () => {
        setSelectedScreen(screenIndex);
    }

    const isActive = selectedScreen === screenIndex;

    return (
        <li onClick={handleClick}
            className={`left-10 flex items-center p-2 rounded-lg ${isActive ? "bg-white text-black" : "text-white hover:bg-gray-700"} group`}
            {...restProps}>
            {children}
        </li>
    );
};

interface SidebarBodyProps {
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.Body = function SidebarBody({ children, ...restProps }: SidebarBodyProps) {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar.Body must be used within a SidebarProvider");
    }
    const { screenIndices } = context;

    // @ts-ignore
    const childrenWithIndex = Children.map(children, (child, index) =>
        React.isValidElement(child) ? React.cloneElement(child, {...child.props ,screenIndex: (child.props as { screenIndex?: number | string }).screenIndex ?? screenIndices[index] }) : child
    );

    return (
        <div className="sm:ml-64" {...restProps}>
            {childrenWithIndex}
        </div>
    );
}

interface SidebarScreenProps {
    screenIndex: number | string;
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.Screen = function SidebarScreen({ screenIndex, children, ...restProps }: SidebarScreenProps) {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar.Screen must be used within a SidebarProvider");
    }
    const { selectedScreen } = context;
    const isActive = selectedScreen === screenIndex;

    return (
        <div className={isActive ? "rounded-lg overflow-y-scroll h-[80vh]" : "hidden"} {...restProps}>
            {children}
        </div>
    );
}

interface SidebarCollapsibleSectionProps {
    title: string;
    children: ReactNode;
    [restProps: string]: any;
}

Sidebar.CollapsibleSection = function SidebarCollapsibleSection({ title, children, ...restProps }: SidebarCollapsibleSectionProps) {
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

export default Sidebar;