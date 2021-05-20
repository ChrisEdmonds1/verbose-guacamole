import React, { useEffect, useReducer }  from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddFilter from './AddFilter';
import Table from './Table';

import type { Columns } from '../Home';

interface Props { 
  columns: Columns[];
};

export interface Row {
  name: string;
  type: string;
  key: string;
}

export interface Action {
  type: string;
  name?: string;
  key?: string;
  filterType?: string;
}


const rowsReducer = (state: Row[], action: Action) => {
  console.log('ACTION ', action);
  switch (action.type) {
    case 'ADD_ROW_WITH_NAME':
      return state.concat([{ name: action.name, type: 'Default', key: uuidv4() }]);
    case 'DELETE_ROW_BY_ID':
      return state.filter(row => row.key !== action.key);
    case 'CHANGE_FITLER_TYPE_WITH_ID':
      return state.map(row => {
        if (row.key === action.key) {
          return Object.assign(row, { type: action.filterType });
        }
        return row;
      });
  }
}

const Filter: React.FC<Props> = ({ columns }) => {
  const [rows, rowsDispatch] = useReducer(rowsReducer, []);

  useEffect(() => {
    console.log('filterRows', rows);
  }, [rows])

  return (
    <>
      <Table rows={rows} rowsDispatch={rowsDispatch} />
      <AddFilter options={columns} rowsDispatch={rowsDispatch} />
    </>
  )
}

export default Filter