
import React, {useEffect, useState} from 'react';
import {Handle, NodeProps, Position,} from 'reactflow';
import {useDispatch,} from 'react-redux';
import {deleteNode, setNodeData} from "../StateMangement/flowSlice";
import useParentData from "../utils/UseParentData";
// @ts-ignore
import {CsvData, CsvRow, CustomData} from "../App";
import {AppDispatch} from "../StateMangement/store";


export const FilterNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData]: CsvData[] | null[]= useParentData(id);
    const [selectedColumn, setSelectedColumn] = useState('Select Column');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('Select condition');


    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if(event) {
            setSelectedColumn(event.target.value);
        }
    };


    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedCondition(event.target.value);
    };


    const runFilter = (event:  React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!selectedColumn || !selectedCondition || !parentData || !selectedValue) {
            console.log('Please select column, condition and value');
            return;
        }
        const filtered: CsvData = parentData.filter( (item: CsvRow): boolean => {
            const value = item[selectedColumn];
            if(value) {
                switch (selectedCondition) {
                    case '==':
                        return value == selectedValue;
                    case '!=':
                        return value != selectedValue;
                    case '>':
                        return value > selectedValue;
                    case '>=':
                        return value >= selectedValue;
                    case '<':
                        return value < selectedValue;
                    case '<=':
                        return value <= selectedValue;
                    default:
                        return true;
                }
            }
            return false;
        });
        console.log('Filtered Data:', filtered);
        dispatch(setNodeData({ id, data: filtered }));
    };


    return (
        <>
            {!parentData ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Filter</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column name:</label>
                        <select className="bg-gray-800 text-white rounded-md p-2">
                            <option value="">← connect dataset...</option>
                        </select>
                    </div>
                    <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Filter</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <form onSubmit={runFilter}>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Column name:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedColumn}
                                onChange={handleColumnChange}
                            >
                                {Object.keys(parentData[0]).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Condition:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedCondition}
                                onChange={handleConditionChange}
                            >
                                <option value="">Select condition</option>
                                <option value="==">Equal (==)</option>
                                <option value="!=">Not Equal (!=)</option>
                                <option value=">">Greater Than (&g;t)</option>
                                <option value=">=">Greater Than or Equal (&gt;=)</option>
                                <option value="<">Less Than (&lt;)</option>
                                <option value="<=">Less Than or Equal (&lt;=)</option>
                            </select>
                        </div>
                        {selectedCondition !== 'Select condition' && (
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Value:</label>
                                <input
                                    type="text"
                                    value={selectedValue}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    placeholder="Enter value..."
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Run
                        </button>
                    </form>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    {<Handle
                        type="source"
                        position={Position.Right}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />}
                </div>
            )}
        </>
    );
};


export const SliceNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData]: CsvData[] | null[]= useParentData(id);
    const [fromIndex, setFromIndex] = useState(0);
    const [toIndex, setToIndex] = useState( 0);


    const handleFromIndexChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setFromIndex(event.target.valueAsNumber);
    };


    useEffect(() => {
        if(parentData){
            setToIndex(parentData.length);
        }
    }, [parentData]);


    const runSlice = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!parentData) {
            console.log('Please connect dataset');
            return;
        }


        if (fromIndex < 0 || toIndex > parentData.length || fromIndex >= toIndex) {
            console.log('Please select valid indices');
            return;
        }


        const slicedData = parentData.slice(fromIndex, toIndex);
        console.log('Sliced Data:', slicedData);
        dispatch(setNodeData({ id, data: slicedData }));
    };


    return (
        (!parentData ? (
            <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Slice</h3>
                    <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col mb-4">
                    <select className="bg-gray-800 text-white rounded-md p-2">
                        <option value="">← connect dataset...</option>
                    </select>
                </div>
                <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
            </div>
        ) : <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Slice</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            <form onSubmit={runSlice}>
                <div className="flex flex-col mb-4">
                    <label className="nodrag text-gray-400 mb-2">From index:</label>
                    <input
                        type="number"
                        value={fromIndex}
                        onChange={handleFromIndexChange}
                        className="bg-gray-800 text-white rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="nodrag text-gray-400 mb-2">To index:</label>
                    <input
                        type="number"
                        placeholder={parentData.length.toString()}
                        value={toIndex}
                        onChange={(event)=>{setToIndex(event.target.valueAsNumber)}}
                        className="bg-gray-800 text-white rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full"
                >
                    Run
                </button>
            </form>
            <Handle
                type="target"
                position={Position.Left}
                className="w-2 h-2 bg-gray-500 rounded-full"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 bg-gray-500 rounded-full"
            />
        </div>)
    );
};


export const SortNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData]: CsvData[] | null[]= useParentData(id);
    const [selectedColumn, setSelectedColumn] = useState('Select Column');
    const [selectedCondition, setSelectedCondition] = useState('Select condition');


    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    };


    const handleConditionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCondition(event.target.value);
    };


    const runSort = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!selectedColumn || !selectedCondition || !parentData) {
            console.log('Please select column and condition');
            return;
        }


        const sorted: CsvData = [...parentData].sort((a: CsvRow, b: CsvRow): number => {
            const valueA = a[selectedColumn];
            const valueB = b[selectedColumn];
            if(valueA && valueB){
                if (selectedCondition === 'Ascen') {
                    return valueA > valueB ? 1 : -1;
                } else if (selectedCondition === 'Descen') {
                    return valueA < valueB ? 1 : -1;
                }
            }
            return 0;
        });


        dispatch(setNodeData({ id, data: sorted }));
    };


    return (
        <>
            {!parentData ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Sort</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column name:</label>
                        <select className="bg-gray-800 text-white rounded-md p-2">
                            <option value="">← connect dataset...</option>
                        </select>
                    </div>
                    <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Sort</h3>
                        <button onClick={() => dispatch(deleteNode(id))}  className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <form onSubmit={runSort}>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Column name:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedColumn}
                                onChange={handleColumnChange}
                            >
                                {Object.keys(parentData[0]).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Condition:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={selectedCondition}
                                onChange={handleConditionChange}
                            >
                                <option value="">Select condition</option>
                                <option value="Ascen">Ascending</option>
                                <option value="Descen">Descending</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Run
                        </button>
                    </form>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                </div>
            )}
        </>
    );
};


// Hook to fetch parent data

export const MergeNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData1, parentData2] = useParentData(id);
    const [selectedColumn1, setSelectedColumn1] = useState('Select Column');
    const [selectedColumn2, setSelectedColumn2] = useState('Select Column');

    const mergeDatasets = (data1: CsvData, data2: CsvData) => {
        if (!data1 || !data2) return [];

        const mergedData = data1.map(row1 => {
            const row2 = data2.find(row2 => row2[selectedColumn2] === row1[selectedColumn1]);
            console.log(row2)
            return row2 ? { ...row1, ...row2 } : row1;
        });
        console.log('Merged Data:', mergedData)
        dispatch(setNodeData({ id, data: mergedData }));
    }

    const handleColumn1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn1(event.target.value);
    };

    const handleColumn2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn2(event.target.value);
    };

    return (
        <>
            {!parentData1 || !parentData2 ? (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Merge</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column name:</label>
                        <select className="bg-gray-800 text-white rounded-md p-2">
                            <option value="">← connect dataset...</option>
                        </select>
                    </div>
                    <Handle type="target" position={Position.Left} id="a" style={{ top: '30%' }} className="w-2 h-2 bg-gray-500 rounded-full" />
                    <Handle type="target" position={Position.Left} id="b" style={{ top: '70%' }} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Merge</h3>
                        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column from Dataset 1:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={selectedColumn1}
                            onChange={handleColumn1Change}
                        >
                            {Object.keys(parentData1[0]).map(column => (
                                <option key={column} value={column}>
                                    {column}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column from Dataset 2:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={selectedColumn2}
                            onChange={handleColumn2Change}
                        >
                            {Object.keys(parentData2[0]).map(column => (
                                <option key={column} value={column}>
                                    {column}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => mergeDatasets(parentData1, parentData2)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">Run</button>
                    <Handle type="target" position={Position.Left} id="a" style={{ top: '30%' }} className="w-2 h-2 bg-gray-500 rounded-full" />
                    <Handle type="target" position={Position.Left} id="b" style={{ top: '70%' }} className="w-2 h-2 bg-gray-500 rounded-full" />
                    <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
            )}
        </>
    );
};

// Helper function to remove specific columns from the dataset
const removeColumnsFromDataset = (data: CsvData, columns: string[]): CsvData => {
  if (!data || !columns.length) return [];

  return data.map(row => {
    const updatedRow = { ...row };
    columns.forEach(column => {
      delete updatedRow[column];
    });
    return updatedRow;
  });
};

// Helper function to keep specific columns in the dataset
const keepColumnsInDataset = (data: CsvData, columns: string[]): CsvData => {
  if (!data || !columns.length) return [];

  return data.map(row => {
    const updatedRow: CsvRow = {};
    columns.forEach(column => {
      if (row[column] !== undefined) {
        updatedRow[column] = row[column];
      }
    });
    return updatedRow;
  });
};

export const RemoveColumnsNode = ({ id }: NodeProps<CustomData>) => {
  const dispatch: AppDispatch = useDispatch();
  const [parentData] = useParentData(id) as [CsvData | null];
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['']);
  const [operation, setOperation] = useState<'keep' | 'remove'>('keep');

  const handleColumnChange = (index: number, value: string) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns[index] = value;
    setSelectedColumns(newSelectedColumns);
  };

  const addColumnSelect = () => {
    setSelectedColumns([...selectedColumns, '']);
  };

  const executeOperation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!parentData || selectedColumns.includes('')) {
      console.log('Please select all columns');
      return;
    }

    let result: CsvData = [];
    if (operation === 'keep') {
      result = keepColumnsInDataset(parentData, selectedColumns);
    } else if (operation === 'remove') {
      result = removeColumnsFromDataset(parentData, selectedColumns);
    }

    dispatch(setNodeData({ id, data: result }));
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Column Selector</h3>
        <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
          &times;
        </button>
      </div>
      {parentData ? (
        <form onSubmit={executeOperation}>
          <div className="flex flex-col mb-4">
            <label className="text-gray-400 mb-2">Operation:</label>
            <select
              className="bg-gray-800 text-white rounded-md p-2"
              value={operation}
              onChange={(e) => setOperation(e.target.value as 'keep' | 'remove')}
            >
              <option value="keep">Keep Columns</option>
              <option value="remove">Remove Columns</option>
            </select>
          </div>
          {selectedColumns.map((selectedColumn, index) => (
            <div className="flex flex-col mb-4" key={index}>
              <label className="text-gray-400 mb-2">Column name:</label>
              <select
                className="bg-gray-800 text-white rounded-md p-2"
                value={selectedColumn}
                onChange={(e) => handleColumnChange(index, e.target.value)}
              >
                <option value="">Select Column</option>
                {Object.keys(parentData[0] || {}).map(column => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex flex-row justify-between w-full">
            <button
              type="button"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
              onClick={addColumnSelect}
            >
              + Add Column
            </button>
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
            >
              {operation === 'keep' ? 'Keep' : 'Remove'}
            </button>
          </div>
          <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
        </form>
      ) : (
        <div className="text-gray-500">Please connect dataset...</div>
      )}
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
    </div>
  );
};

const pivotLonger = (data: CsvData, colsToPivot: string[], namesTo: string, valuesTo: string): CsvData => {
    if (!data || !colsToPivot.length || !namesTo || !valuesTo) return [];

    const pivotedData: CsvData = [];

    data.forEach(row => {
        colsToPivot.forEach(col => {
            const newRow = {
                ...row,
                [namesTo]: col,
                [valuesTo]: row[col]
            };
            delete newRow[col];
            pivotedData.push(newRow);
        });
    });

    return pivotedData;
};

export const PivotNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [colsToPivot, setColsToPivot] = useState<string[]>([]);
    const [namesTo, setNamesTo] = useState('');
    const [valuesTo, setValuesTo] = useState('');

    const handleColsToPivotChange = (index: number, value: string) => {
        const newColsToPivot = [...colsToPivot];
        newColsToPivot[index] = value;
        setColsToPivot(newColsToPivot);
    };

    const addColToPivot = () => {
        setColsToPivot([...colsToPivot, '']);
    };

    const handleNamesToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamesTo(event.target.value);
    };

    const handleValuesToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesTo(event.target.value);
    };

    const pivotData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || colsToPivot.includes('') || !namesTo || !valuesTo) {
            console.log('Please fill all pivot fields');
            return;
        }

        const result = pivotLonger(parentData, colsToPivot, namesTo, valuesTo);
        console.log(result)
        dispatch(setNodeData({ id, data: result }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Pivot Data</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={pivotData}>
                    {colsToPivot.map((col, index) => (
                        <div className="flex flex-col mb-4" key={index}>
                            <label className="text-gray-400 mb-2">Column to Pivot:</label>
                            <select
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={col}
                                onChange={(e) => handleColsToPivotChange(index, e.target.value)}
                            >
                                <option value="">Select Column</option>
                                {Object.keys(parentData[0] || {}).map(column => (
                                    <option key={column} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-4"
                        onClick={addColToPivot}
                    >
                        + Add Column to Pivot
                    </button>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Names To:</label>
                        <input
                            type="text"
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={namesTo}
                            onChange={handleNamesToChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Values To:</label>
                        <input
                            type="text"
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={valuesTo}
                            onChange={handleValuesToChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Pivot
                    </button>
                    <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
                </form>
            ) : (
                <div className="text-gray-500">Please connect dataset...</div>
            )}
            <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );
};

const mutateColumn = (data: CsvData, column: string, operation: string, constant: number, pattern?: string, replacement?: string): CsvData => {
    if (!data || !column || !operation) return data;

    return data.map(row => {
        const updatedRow = { ...row };
        if (updatedRow[column]) {
            if (operation === 'regex' && pattern && replacement) {
                const regex = new RegExp(pattern, 'g');
                updatedRow[column] = updatedRow[column]!.toString().replace(regex, "");
            } else {
                // const value = parseFloat(updatedRow[column]?.toString());
                // switch (operation) {
                //     case 'add':
                //         updatedRow[column] = value + constant;
                //         break;
                //     case 'subtract':
                //         updatedRow[column] = value - constant;
                //         break;
                //     case 'multiply':
                //         updatedRow[column] = value * constant;
                //         break;
                //     case 'divide':
                //         updatedRow[column] = value / constant;
                //         break;
                //     default:
                //         break;
                // }
            }
        }
        return updatedRow;
    });
};

export const MutateNode = ({ id }: NodeProps<CustomData>) => {
    const dispatch: AppDispatch = useDispatch();
    const [parentData] = useParentData(id) as [CsvData | null];
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'regex'>('add');
    const [constant, setConstant] = useState<number>(0);
    const [pattern, setPattern] = useState<string>('');
    const [replacement, setReplacement] = useState<string>('');

    const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    };

    const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOperation(event.target.value as 'add' | 'subtract' | 'multiply' | 'divide' | 'regex');
    };

    const handleConstantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConstant(parseFloat(event.target.value));
    };

    const handlePatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPattern(event.target.value);
    };

    const handleReplacementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplacement(event.target.value);
    };

    const applyMutation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!parentData || !selectedColumn) {
            console.log('Please select a column and set all fields');
            return;
        }

        let result: CsvData = [];
        if (operation === 'regex') {
            result = mutateColumn(parentData, selectedColumn, operation, 0, pattern, replacement);
        } else {
            result = mutateColumn(parentData, selectedColumn, operation, constant);
        }

        dispatch(setNodeData({ id, data: result }));
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-md p-4 w-64 text-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Mutate Column</h3>
                <button onClick={() => dispatch(deleteNode(id))} className="text-gray-400 hover:text-gray-300">
                    &times;
                </button>
            </div>
            {parentData ? (
                <form onSubmit={applyMutation}>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Column:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={selectedColumn}
                            onChange={handleColumnChange}
                        >
                            <option value="">Select Column</option>
                            {Object.keys(parentData[0] || {}).map(column => (
                                <option key={column} value={column}>
                                    {column}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2">Operation:</label>
                        <select
                            className="bg-gray-800 text-white rounded-md p-2"
                            value={operation}
                            onChange={handleOperationChange}
                        >
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                            <option value="multiply">Multiply</option>
                            <option value="divide">Divide</option>
                            <option value="regex">Regex Replace</option>
                        </select>
                    </div>
                    {operation === 'regex' ? (
                        <>
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Pattern:</label>
                                <input
                                    type="text"
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={pattern}
                                    onChange={handlePatternChange}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="text-gray-400 mb-2">Replacement:</label>
                                <input
                                    type="text"
                                    className="bg-gray-800 text-white rounded-md p-2"
                                    value={replacement}
                                    onChange={handleReplacementChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col mb-4">
                            <label className="text-gray-400 mb-2">Constant:</label>
                            <input
                                type="number"
                                className="bg-gray-800 text-white rounded-md p-2"
                                value={constant}
                                onChange={handleConstantChange}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Apply
                    </button>
                    <Handle type="source" position={Position.Right} className="w-2 h-2 bg-gray-500 rounded-full" />
                </form>
            ) : (
                <div className="text-gray-500">Please connect dataset...</div>
            )}
            <Handle type="target" position={Position.Left} className="w-2 h-2 bg-gray-500 rounded-full" />
        </div>
    );
};