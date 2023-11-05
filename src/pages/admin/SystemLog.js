import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined } from 'utils/utils';
import { useEffect } from 'react';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import { useState } from 'react';
import moment from 'moment/moment';
import BackDrop from 'components/BackDrop';
import { useCallback } from 'react';
import SystemLogService from 'services/SystemLogService';

const systemLogService = new SystemLogService();

const SystemLog = () => {

  TabTitle('HantahaAdmin | Hata Yönetimi');

  const columns = [
    { name: 'source', header: 'Kaynak', minWidth: 50, defaultFlex: 0.5 },
    { name: 'url', header: 'URL', minWidth: 50, defaultFlex: 1 },
    { name: 'userFullname', header: 'Oluşturan', minWidth: 50, defaultFlex: 1,render: ({ value }) => (checkVariableNullOrUndefined(value) || checkStringVariableEmpty(value) ? "Anonim" : value) }, 
    { name: 'ipAddress', header: 'IP', minWidth: 50, defaultFlex: 1 },
    { name: 'requestQueryString', header: 'Sorgu Metni', minWidth: 50, defaultFlex: 1 },
    { name: 'message', header: 'Hata Mesajı', minWidth: 50, defaultFlex: 3 },
    {
      name: 'date',
      header: 'Hata Tarihi',
      defaultFlex: 1,
      dateFormat: 'DD-MM-YYYY hh:mm:ss',
      filterEditor: DateFilter,
      filterEditorProps: (props, { index }) => {
        return {
          dateFormat: 'MM-DD-YYYY',
          placeholder: index == 1 ? 'Önce' : 'Sonra'
        };
      },
      render: ({ value, cellProps: { dateFormat } }) => (value ? moment(value).format(dateFormat) : undefined)
    },
  ];

  const defaultFilterValue = [
    { name: 'source', operator: 'startsWith', type: 'string', value: '' },
    { name: 'url', operator: 'startsWith', type: 'string', value: '' },
    { name: 'ipAddress', operator: 'startsWith', type: 'string', value: '' },
    { name: 'userFullname', operator: 'startsWith', type: 'string', value: '' },
    { name: 'requestQueryString', operator: 'startsWith', type: 'string', value: '' },
    { name: 'message', operator: 'startsWith', type: 'string', value: '' },
    { name: 'date', operator: 'after', type: 'date', value: '' }
  ];

  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const getList = useCallback(async () => {
    setLoading(true);
    let log = await systemLogService.list();
    setLog(log);
    setLoading(false);
  }, [systemLogService]);

  useEffect(() => {
    const fetchData = async () => {
      getList();
    };
    fetchData();
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Table dataSource={log}  columns={columns} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default SystemLog;
