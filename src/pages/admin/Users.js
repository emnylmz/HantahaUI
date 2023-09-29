import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
// import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import { TabTitle } from 'utils/utils';
import { useEffect } from 'react';
import UserService from 'services/UserService';
// import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import { Button, Typography, IconButton,FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import moment from 'moment/moment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';




// //data source olacak
// const dataSource = [
//   { id: 1, name: 'John McQueen', age: 35 },
//   { id: 2, name: 'Mary Stones', age: 25 },
//   { id: 3, name: 'Robert Fil', age: 27 },
//   { id: 4, name: 'Roger Robson', age: 81 },
//   { id: 5, name: 'Billary Konwik', age: 18 },
//   { id: 6, name: 'Bob Martin', age: 18 },
//   { id: 7, name: 'Matthew Richardson', age: 54 },
//   { id: 8, name: 'Ritchie Peterson', age: 54 },
//   { id: 9, name: 'Bryan Martin', age: 40 },
//   { id: 10, name: 'Mark Martin', age: 44 },
//   { id: 11, name: 'Michelle Sebastian', age: 24 },
//   { id: 12, name: 'Michelle Sullivan', age: 61 },
//   { id: 13, name: 'Jordan Bike', age: 16 },
//   { id: 14, name: 'Nelson Ford', age: 34 },
//   { id: 15, name: 'Tim Cheap', age: 3 },
//   { id: 16, name: 'Robert Carlson', age: 31 },
//   { id: 17, name: 'Johny Perterson', age: 40 }
// ];

const Users = () => {
  const columns = [
    {
      name: 'id',
      header: '',
      defaultFlex: 0.2,
      render: ({ value }) => {
        return (
          <IconButton aria-label="delete" size="small" onClick={() => handleClick(value)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        );
      }
    },
    { name: 'fullname', header: 'Ad Soyad', minWidth: 50, defaultFlex: 1 },
    { name: 'username', header: 'Kullanıcı Adı', minWidth: 50, defaultFlex: 1 },
    { name: 'email', header: 'E-Posta', minWidth: 50, defaultFlex: 1 },
    { name: 'country', header: 'Ülke', minWidth: 50, defaultFlex: 1 },
    { name: 'lastLoginIP', header: 'Son Girilen IP', minWidth: 50, defaultFlex: 0.8 },
    {
      name: 'lastLoginDate',
      header: 'Son Giriş',
      defaultFlex: 1,
      dateFormat: 'DD-MM-YYYY hh:mm',
      filterEditor: DateFilter,
      filterEditorProps: (props, { index }) => {
        return {
          dateFormat: 'MM-DD-YYYY',
          placeholder: index == 1 ? 'Önce' : 'Sonra'
        };
      },
      render: ({ value, cellProps: { dateFormat } }) => (value ? moment(value).format(dateFormat) : undefined)
    },
    {
      name: 'createdOn',
      header: 'Oluşturulma',
      defaultFlex: 1,
      dateFormat: 'DD-MM-YYYY hh:mm',
      filterEditor: DateFilter,
      filterEditorProps: (props, { index }) => {
        return {
          dateFormat: 'MM-DD-YYYY',
          placeholder: index == 1 ? 'Önce' : 'Sonra'
        };
      },
      render: ({ value, cellProps: { dateFormat } }) => (value ? moment(value).format(dateFormat) : undefined)
    },
    {
      name: 'userVisibilityType',
      header: 'Görünürlük',
      minWidth: 50,
      defaultFlex: 1,
      type: 'number',
      render: ({ value }) => (value === 1 ? 'Sadece ad soyad' : value === 2 ? 'Sadece Kullanıcı Adı' : 'Hepsi')
    },
    { name: 'isActive', header: 'Aktif', minWidth: 50, defaultFlex: 0.5, render: ({ value }) => (value ? 'Aktif' : 'Pasif') },
    { name: 'isAdmin', header: 'Rol', minWidth: 50, defaultFlex: 0.5, render: ({ value }) => (value ? 'Yönetici' : 'Kullanıcı') }
  ];

  const gridStyle = { minHeight: 550 };

  const defaultFilterValue = [
    { name: 'fullname', operator: 'startsWith', type: 'string', value: '' },
    { name: 'country', operator: 'startsWith', type: 'string', value: '' },
    { name: 'lastLoginIP', operator: 'startsWith', type: 'string', value: '' },
    { name: 'username', operator: 'startsWith', type: 'string', value: '' },
    { name: 'email', operator: 'startsWith', type: 'string', value: '' },
    { name: 'lastLoginDate', operator: 'after', type: 'date', value: '' },
    { name: 'createdOn', operator: 'after', type: 'date', value: '' }
    // { name: 'isActive', operator: 'eq', type: 'bool',value:null },

    // {
    //   name: 'isActive',
    //   defaultFlex: 1,
    //   minWidth: 50,
    //   header: 'Aktif',
    //   filterEditor: SelectFilter,
    //   filterEditorProps: {
    //     multiple: true,
    //     wrapMultiple: false,
    //     dataSource: ['Aktif', 'Pasif'].map(c => {
    //       return { id: c, label: c}
    //     }),
    //   }
    // }
    // { name: 'age', operator: 'gte', type:  'number', value: '' }
    // { name: 'city', operator: 'startsWith', type: 'string', value: '' },
    // {
    //   name: 'birthDate',
    //   operator: 'before',
    //   type: 'date',
    //   value: ''
    // },
    // { name: 'country', operator: 'eq', type: 'select', value: 'ca' }
  ];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{setOpen(false); setUser({})} 

  const handleSubmit=async()=>{
    console.log(user);
    setOpen(false);
  }

  let handleClick = (value) => {
    setUser(users.find((x) => x.id === value));
    handleOpen();
  };

  let getUsers = async () => {
    setLoading(true);
    const userService = new UserService();
    let users = await userService.getAllUsers();
    setLoading(false);
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);
  TabTitle('HantahaAdmin | Kullanıcılar');
  return (
    <MainCard>
      <Button onClick={handleOpen}>Düzenle</Button>
      <Dialog fullWidth maxWidth='sm'  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {user.fullname}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          <FormControlLabel
                  control={
                    <Checkbox checked={user.isAdmin} onChange={()=>setUser(prevUser => ({
                      ...prevUser,
                      isAdmin: !prevUser.isAdmin
                    }))} color="primary" />
                  }
                  label="Yönetici mi?"
          />
          </Typography>
          <Typography gutterBottom>
          <FormControlLabel
                  control={
                    <Checkbox checked={user.isActive}  color="primary" onChange={()=>setUser(prevUser => ({
                      ...prevUser,
                      isActive: !prevUser.isActive
                    }))} />
                  }
                  label="Aktif mi?"
          />
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} variant="contained" autoFocus onClick={handleSubmit}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {!loading ? <Table dataSource={users} columns={columns} gridStyle={gridStyle} defaultFilterValue={defaultFilterValue} /> : <></>}
    </MainCard>
  );
};

export default Users;
