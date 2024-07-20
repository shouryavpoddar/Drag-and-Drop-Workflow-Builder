import React, {useMemo, useRef} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useSelector } from 'react-redux';
import { RootState } from '../StateMangement/store';
import {CsvData} from "../App";

const DataTable: React.FC = () => {
    const data: CsvData | null = useSelector((state: RootState) => state.output.data);

    const columns = useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).map(key => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey: key,
            id: key,
        }));
    }, [data]);

    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: data?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35, // Adjust the size based on your row height
        overscan: 5,
    });

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: columns.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 150, // Adjust the size based on your column width
        overscan: 5,
    });

    return (
        <div className="h-full">
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: `500px`,
                    width: `100%`,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: `${columnVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow, index) => (
                        <React.Fragment key={virtualRow.key}>
                            {columnVirtualizer.getVirtualItems().map(virtualColumn => (
                                <div
                                    key={virtualColumn.key}
                                    className={` outline outline-1 border border-gray-500 text-center`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: `${virtualColumn.size }px`,
                                        height: `${virtualRow.size}px`,
                                        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    {virtualRow.index === 0
                                        ? columns[virtualColumn.index].header
                                        : data![virtualRow.index][columns[virtualColumn.index].accessorKey]}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default DataTable;