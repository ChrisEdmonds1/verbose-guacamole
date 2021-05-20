import React, { useCallback, useRef } from 'react';
import { Table as AntTable, Space, Select, Button } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Row } from './index';

const { Column } = AntTable;
const { Option } = Select;

const itemType = 'DragableBodyRow';
interface DragableBodyRowProps {
  index: number;
  moveRow: () => void;
  className: string;
  style: {};
}

const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DragableBodyRowProps) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: itemType,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type: itemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const filterTypeOptions = ['Default', 'Date', 'Search', 'Score'];

interface TableProps {
  rows: Row[];
  rowsDispatch: any;
}

const Table: React.FC<TableProps> = ({ rows, rowsDispatch }) => {
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      rowsDispatch({
        type: 'MOVE_ROW',
        moveProps: { dragIndex, hoverIndex },
      });
    },
    [rows]
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <AntTable
        dataSource={rows}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow,
        })}
        pagination={false}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(type, record) => (
            <Select
              value={type}
              onSelect={(optionValue) =>
                rowsDispatch({
                  type: 'CHANGE_FITLER_TYPE_WITH_ID',
                  key: record.key,
                  filterType: optionValue,
                })
              }
            >
              {filterTypeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          )}
        />
        <Column
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                onClick={() =>
                  rowsDispatch({
                    type: 'DELETE_ROW_BY_ID',
                    key: record.key,
                  })
                }
                danger
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </AntTable>
    </DndProvider>
  );
};

export default Table;
