import React from 'react'
import AddFilter from './AddFilter'

import type { Columns } from '../Home'

interface Props { 
  columns: Columns[];
};

const Filter: React.FC<Props> = ({ columns }) => {

  return (
    <>
      <AddFilter options={columns} />
    </>
  )
}

export default Filter