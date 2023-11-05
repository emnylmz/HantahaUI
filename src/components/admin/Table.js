import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { i18n } from 'components/Tablei18n';
import { useState } from 'react';
import BackDrop from 'components/BackDrop';
import { useEffect } from 'react';
import '@inovua/reactdatagrid-community/index.css';

// import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
// import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

function Table(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (props.dataSource) {
      setLoading(false);
    }
  }, [props.dataSource]);
  
  const emptyText = (
    <b
      style={{
        padding: 8,
        border: '1px solid #7986cb',
        color: '#ef9a9a',
        borderRadius: 4
      }}
    >
      Listelenecek veri bulunamadı !!!
    </b>
  );

  return (
    <>
      <BackDrop loading={loading} />
      {!loading ?<ReactDataGrid
        idProperty="id"
        columns={props.columns}
        rowClassName={props.rowClassName!=undefined?props.rowClassName:undefined}
        i18n={i18n}
        emptyText={emptyText}
        dataSource={props.dataSource || []}
        style={{minHeight: 550}}
        pagination
        enableSelection
        defaultFilterValue={props.defaultFilterValue}
      />:<></>}
    </>
  );
}

export default Table;
