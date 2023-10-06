import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
import { TabTitle } from 'utils/utils';
import { useEffect } from 'react';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import { Button, FormControlLabel, TextField, Grid } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import moment from 'moment/moment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Checkbox from '@mui/material/Checkbox';
import BackDrop from 'components/BackDrop';
import LanguageService from 'services/LanguageService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { pink } from '@mui/material/colors';
import alertify from 'alertifyjs';
import { useCallback } from 'react';
import CountryService from 'services/CountryService';
import CountrySelect from 'components/admin/CountrySelect';


const languageService = new LanguageService();
const countryService = new CountryService();

const Language = () => {
  TabTitle('HantahaAdmin | Diller');
  const columns = [
    {
      name: 'id',
      header: '',
      defaultFlex: 0.5,
      render: ({ value }) => {
        return (
          <>
            <Tooltip title="DÜzenle">
              <IconButton aria-label="edit" size="small" onClick={()=>getLanguage(value)} >
                <EditIcon color="primary" fontSize="inherit"  />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sil">
              <IconButton onClick={()=>removeLanguage(value)} aria-label="edit" size="small">
                <DeleteIcon sx={{ color: pink[500] }} fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    },
    { name: 'name', header: 'Dil', minWidth: 50, defaultFlex: 1 },
    { name: 'isActive', header: 'Aktif', minWidth: 50, defaultFlex: 0.5, render: ({ value }) => (value ? 'Aktif' : 'Pasif') },
    { name: 'createdBy', header: 'Oluşturan', minWidth: 50, defaultFlex: 1 },
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
    { name: 'updatedBy', header: 'Güncelleyen', minWidth: 50, defaultFlex: 1 },
    {
      name: 'updatedOn',
      header: 'Son Güncelleme',
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
    }
  ];

  const getLanguage = async (id) => {
    setLoading(true);
    let result = await languageService.getLanguage(id);
    setLanguage(result);
    setOpen(true);
    setLoading(false);
  };

  const gridStyle = { minHeight: 550 };

  const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'createdBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedOn', operator: 'after', type: 'date', value: '' },
    { name: 'createdOn', operator: 'after', type: 'date', value: '' }
  ];

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState({ isActive: true, name: '' });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  
  const handleClose = () => {
    setOpen(false);
    setLanguage({});
  };

  const handleSubmit = async () => {
    setLoading(true);
    const languageData = {
      Id: language.id,
      IsActive: language.isActive,
      Name: language.name,
      LanguageCountries:language.languageCountries.map(x=>x.id)
    };
    const result = await languageService.createOrUpdateLanguage(languageData);
    if (result) await getLanguageList();
    setLoading(false);
    setOpen(false);
  };

  const getLanguageList = useCallback(async () => {
    let languages = await languageService.list();
    setLanguages(languages);
  }, [languageService]);

  const removeLanguage = async (id) => {
    const language=languages.find((x) => x.id === id);
    alertify.confirm(language.name, language.name+' adlı kayıdı silmek istediğinizden emin misiniz?', 
    async function(){ 
      
      await languageService.removeLanguage(id);
      getLanguageList();
    }, function(){ }).set('labels', {ok:'Sil', cancel:'İptal'});
  };

  let getAllCountries = async () => {
    var data = await countryService.getAllCountries();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountries = await getAllCountries();
      getLanguageList();
      setCountries(fetchedCountries);
    };
    fetchData();
  }, [loading]);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Tooltip title="Dil Güncelle/Ekle">
        <IconButton onClick={() => setOpen(true)} color="primary" aria-label="add şanguage">
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Dil Ekle
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
            <TextField
              style={{ marginBottom: '10px' }}
              required
              fullWidth
              value={language.name}
              inputProps={{
                maxLength: 100
              }}
              onChange={(e) => {
                setLanguage((p) => ({
                  ...p,
                  name: e.target.value
                }));
              }}
              label="Dil adı"
            />
          <FormControlLabel
              control={
                <Checkbox
                  checked={language.isActive}
                  color="primary"
                  onChange={() =>
                    setLanguage((prevLanguage) => ({
                      ...prevLanguage,
                      isActive: !prevLanguage.isActive
                    }))
                  }
                />
              }
              label="Aktif mi?"
            />
            <Grid item xs={12}>

            <CountrySelect
                    countryIds={language.languageCountries}
                    multiple={true}
                    countries={countries}
                    setCountryId={(e) => {
                      setLanguage((p) => ({
                        ...p,
                        languageCountries: e
                      }));
                    }}
                  />
            </Grid>
             
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} variant="contained" autoFocus onClick={handleSubmit}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
      <Table dataSource={languages} columns={columns} gridStyle={gridStyle} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default Language;
