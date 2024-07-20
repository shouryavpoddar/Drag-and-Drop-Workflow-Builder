import React, { useEffect, useState } from 'react';
import { AutoSizer, MultiGrid, GridCellProps } from 'react-virtualized';
import { useSelector } from "react-redux";
import { RootState } from "../../StateMangement/store";

function Table({ height }: { height: number }): JSX.Element {
    const results = useSelector((state: RootState) => state.output.data);

    const [state, setState] = useState({
        fixedColumnCount: 1,
        fixedRowCount: 1,
        scrollToColumn: 0,
        scrollToRow: 0,
        refresh: false
    });

    const [columns, setColumns] = useState<{ accessorKey: string, header: string }[]>([]);

    useEffect(() => {
        if (results.length > 0) {
            const keys = Object.keys(results[0]);
            const newColumns = keys.map(key => ({
                accessorKey: key,
                header: key.charAt(0).toUpperCase() + key.slice(1)
            }));
            setColumns(newColumns);
        }
        setState({ ...state, refresh: !state.refresh });
    }, [results]);

    const cellRenderer = ({
                              columnIndex,
                              key,
                              rowIndex,
                              style
                          }: GridCellProps): JSX.Element => {
        if (!columns.length) {
            return <div key={key} style={style}></div>;
        }

        return (
            <div
                className="text-[#fff] text-[12px] border border-gray-700 px-2 bg-gray-800 border-solid truncate"
                key={key}
                style={style}
            >
                {rowIndex === 0 ? (
                    `${columns[columnIndex].header}`
                ) : (
                    <span>{`${results?.[rowIndex - 1]?.[columns?.[columnIndex]?.accessorKey]}`}</span>
                )}
            </div>
        );
    };

    return (
        <div
            className="overflow-visible relative h-[200px] w-full border-solid border-cyan-500"
            style={{ height: `${height}px`, width: '100%' }}
        >
            <AutoSizer disableHeight>
                {({ width }): JSX.Element => (
                    <MultiGrid
                        {...state}
                        cellRenderer={cellRenderer}
                        columnWidth={180}
                        columnCount={columns.length}
                        enableFixedColumnScroll
                        enableFixedRowScroll
                        height={height}
                        rowHeight={26}
                        rowCount={results.length + 1}  // +1 for the header row
                        width={width}
                        hideTopRightGridScrollbar
                        hideBottomLeftGridScrollbar
                        hideBottomRightGridScrollbar
                    />
                )}
            </AutoSizer>
        </div>
    );
}

export default Table;