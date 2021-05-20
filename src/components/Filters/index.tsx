import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import { Button } from 'antd';
import AddFilter from './AddFilter';
import Table from './Table';

import type { Columns } from '../Home';

interface Props {
  columns: Columns[];
}

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
  moveProps?: {
    dragIndex: number;
    hoverIndex: number;
  };
}

const rowsReducer = (state: Row[], action: Action) => {
  switch (action.type) {
    case 'ADD_ROW_WITH_NAME':
      if (action.name) {
        return state.concat([
          { name: action.name, type: 'Default', key: uuidv4() },
        ]);
      }
      break;
    case 'DELETE_ROW_BY_ID':
      return state.filter((row) => row.key !== action.key);
    case 'CHANGE_FITLER_TYPE_WITH_ID':
      return state.map((row) => {
        if (row.key === action.key) {
          return Object.assign(row, { type: action.filterType });
        }
        return row;
      });
    case 'MOVE_ROW':
      if (action.moveProps) {
        const { dragIndex, hoverIndex } = action.moveProps;
        const dragRow = state[dragIndex];
        return update(state, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        });
      }
      break;
    default:
      throw new Error();
  }
};

const Filter: React.FC<Props> = ({ columns }) => {
  const [rows, rowsDispatch] = useReducer(rowsReducer, []);

  const onSave = () => {
    const message = rows.reduce((total, current) => {
      const { name, type } = current;

      return `${total}\n${name} - ${type}`;
    }, 'Saved filters:');
    window.alert(message);
  };

  return (
    <>
      <Table rows={rows} rowsDispatch={rowsDispatch} />
      <AddFilter options={columns} rowsDispatch={rowsDispatch} />
      <Button onClick={onSave}>Save</Button>
    </>
  );
};

export default Filter;
