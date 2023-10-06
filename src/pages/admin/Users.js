import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
// import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import { TabTitle } from 'utils/Utils';
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
import BackDrop from 'components/BackDrop';

const userService = new UserService();

const Users = () => {
  const columns = [
    {
      name: 'id',
      header: '',
      defaultFlex: 0.2,
      render: ({ value }) => {
        return (
          <IconButton aria-label="edit" size="small" onClick={() => handleClick(value)}>
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
  ];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{setOpen(false); setUser({})} 

  const handleSubmit=async()=>{
    setLoading(true);
    const userData={
      Id:user.id,
      IsActive:user.isActive,
      IsAdmin:user.isAdmin
    }
    const result=await userService.updateUser(userData);
    if(result) await getUsers();
    setLoading(false);
    setOpen(false);
  }

  let handleClick = (value) => {
    setUser(users.find((x) => x.id === value));
    handleOpen();
  };

  let getUsers = async () => {
    setLoading(true);
    let users = await userService.getAllUsers();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);
  TabTitle('HantahaAdmin | Kullanıcılar');
  return (
    <MainCard>
      <BackDrop loading={loading}/>
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
