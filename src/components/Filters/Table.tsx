import React from 'react';
import {
  Table as AntTable,
  Space,
  Select,
  Button,
} from 'antd';
import type { Row } from './index';

const { Column } = AntTable;
const { Option } = Select;

const typeOptions = [
  'Default',
  'Date',
  'Search',
  'Score',
];

interface TableProps {
  rows: Row[];
  rowsDispatch: any;
};

const Table: React.FC<TableProps> = ({ rows, rowsDispatch }) => {
  return (
    <AntTable dataSource={rows}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Type"
        dataIndex="type"
        key="type"
        render={(type, record) => (
          <Select
            value={type}
            onSelect={(optionValue) => rowsDispatch({
              type: 'CHANGE_FITLER_TYPE_WITH_ID',
              key: record.key,
              filterType: optionValue,
            })}
          >
            {typeOptions.map(option => <Option key={option} value={option}>{option}</Option>)}
          </Select>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <Button
              onClick={() => rowsDispatch({
                type: 'DELETE_ROW_BY_ID',
                key: record.key,
              })}
              danger
            >
              Delete
            </Button>
          </Space>
        )}
      />
    </AntTable>
  )
};

export default Table;