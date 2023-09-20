import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import { TabTitle } from 'utils/utils';

//data source olacak
const dataSource = [
  { id: 1, name: 'John McQueen', age: 35 },
  { id: 2, name: 'Mary Stones', age: 25 },
  { id: 3, name: 'Robert Fil', age: 27 },
  { id: 4, name: 'Roger Robson', age: 81 },
  { id: 5, name: 'Billary Konwik', age: 18 },
  { id: 6, name: 'Bob Martin', age: 18 },
  { id: 7, name: 'Matthew Richardson', age: 54 },
  { id: 8, name: 'Ritchie Peterson', age: 54 },
  { id: 9, name: 'Bryan Martin', age: 40 },
  { id: 10, name: 'Mark Martin', age: 44 },
  { id: 11, name: 'Michelle Sebastian', age: 24 },
  { id: 12, name: 'Michelle Sullivan', age: 61 },
  { id: 13, name: 'Jordan Bike', age: 16 },
  { id: 14, name: 'Nelson Ford', age: 34 },
  { id: 15, name: 'Tim Cheap', age: 3 },
  { id: 16, name: 'Robert Carlson', age: 31 },
  { id: 17, name: 'Johny Perterson', age: 40 }
];

const columns = [
  { name: 'name', header: 'Name', minWidth: 50, defaultFlex: 2 },
  { name: 'age', header: 'Age', maxWidth: 1000, defaultFlex: 1, type: 'number', filterEditor: NumberFilter }
];

const gridStyle = { minHeight: 550 };

const defaultFilterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'age', operator: 'gte', type: 'number', value: '' }
  // { name: 'city', operator: 'startsWith', type: 'string', value: '' },
  // {
  //   name: 'birthDate',
  //   operator: 'before',
  //   type: 'date',
  //   value: ''
  // },
  // { name: 'country', operator: 'eq', type: 'select', value: 'ca' }
];

const Users = () => {
  TabTitle('HantahaAdmin | Kullanıcılar');
  return (
    <MainCard>
      <Table dataSource={dataSource} columns={columns} gridStyle={gridStyle} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default Users;
