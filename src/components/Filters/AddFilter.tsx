import React from "react"
import { Popover, Select } from 'antd'

import type { Columns } from '../Home'

interface Props { 
  options: Columns[];
};

const { Option } = Select

const formatSampleData = (sample: []) => {
  const shortenedSamples: string[] = sample.map((item: string) => {
    if (item.length >= 100) {
      return `${item.substring(0, 50)}...`
    }
    return item
  })
  return shortenedSamples.join('\n')
}

const AddFilter: React.FC<Props> = ({ options }) => {
  return (
    <Select placeholder="Add filter" value="Add filter" showArrow={false} style={{ width: 120 }}>
      {options && options.map((option: { sampleHeader: string, sample: [] }) => {
        const { sampleHeader, sample } = option
        console.log('........',sampleHeader)
        return (
            <Option value={sampleHeader}>
              <Popover className="samples-popover" key={sampleHeader} placement="right" title="Sample data" content={formatSampleData(sample)}>
                <div>
                  {sampleHeader}
                </div>
              </Popover>
            </Option>
          
        )
      })}
    </Select>
  )
}

export default AddFilter
