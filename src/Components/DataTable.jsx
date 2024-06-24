import React, { useMemo, useRef, useState} from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {useSelector} from "react-redux";

const DataTable = () => {
    const data = useSelector(state => state.output.data);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    const columns = useMemo(() => {
        if (data.length === 0) return [];
        console.log(Object.keys(data[0]))
        return Object.keys(data[0]).map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessorKey:  key,
            id: isNaN(key) ? key : parseInt(key),
        }));
    }, [data]);

    const tableInstance = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
    });

    const { rows } = tableInstance.getRowModel();

    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 5,
        overscan: 25,
    });

    return (
        <div className={'h-full'}>
            <div ref={parentRef} className="h-full overflow-y-auto">
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    <table>
                        <thead>
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="border px-4"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
                            const row = rows[virtualRow.index];
                            return (
                                <tr
                                    key={row.id}
                                    style={{ height: `${virtualRow.size}px`,
                                        transform: `translateY(${ virtualRow.start - index * virtualRow.size }px)`,
                                        textAlign: 'center',
                                        borderBottom: '1px',
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id} >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
