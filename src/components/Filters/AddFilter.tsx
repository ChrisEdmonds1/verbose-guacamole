import { Popover, Select } from 'antd';
import React from 'react';
import type { Columns } from '../Home';

const { Option } = Select

interface AddFilterProps { 
  options: Columns[];
  rowsDispatch: any;
};

const formatSampleData = (sample: []) => {
  const shortenedSamples: string[] = sample.map((item: string) => {
    if (item.length >= 100) {
      return `${item.substring(0, 50)}...`;
    }
    return item;
  })
  return shortenedSamples.join('\n');
};

const AddFilter: React.FC<AddFilterProps> = ({ options, rowsDispatch }) => {
  return (
    <Select 
      placeholder="Add filter"
      value="Add filter"
      onSelect={(optionValue) => rowsDispatch({
        type: 'ADD_ROW_WITH_NAME',
        name: optionValue,
      })}
      showArrow={false}
      style={{ width: 120 }}
    >
      {options && options.map((option: { sampleHeader: string, sample: [] }) => {
        const { sampleHeader, sample } = option
        return (
            <Option key={sampleHeader} value={sampleHeader}>
              <Popover className="samples-popover" placement="right" title="Sample data" content={formatSampleData(sample)}>
                <div>
                  {sampleHeader}
                </div>
              </Popover>
            </Option>
          
        )
      })}
    </Select>
  )
};

export default AddFilter;
