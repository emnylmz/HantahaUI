import React from 'react'
import '@inovua/reactdatagrid-community/index.css';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { i18n } from 'components/Tablei18n';
// import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
// import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

function Table(props) {

  return (
    <ReactDataGrid
      idProperty="id"
      columns={props.columns}
      i18n={i18n}
      dataSource={props.dataSource}
      style={props.gridStyle}
      pagination
      defaultFilterValue={filterValue}
    />
  )
}

export default Table