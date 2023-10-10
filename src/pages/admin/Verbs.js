import Table from 'components/admin/Table';
import MainCard from '../../components/admin/cards/MainCard';
import { TabTitle } from 'utils/utils';
import { useEffect } from 'react';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import moment from 'moment/moment';
import BackDrop from 'components/BackDrop';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { pink } from '@mui/material/colors';
import alertify from 'alertifyjs';
import { useCallback } from 'react';
import VerbService from 'services/VerbService';


const verbService = new VerbService();

const Verbs = () => {
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
              <IconButton aria-label="edit" size="small" onClick={()=>window.location.href='/verb/edit/'+value} >
                <EditIcon color="primary" fontSize="inherit"  />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sil">
              <IconButton onClick={()=>removeVerb(value)} aria-label="edit" size="small">
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

  const gridStyle = { minHeight: 550 };

  const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'createdBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedOn', operator: 'after', type: 'date', value: '' },
    { name: 'createdOn', operator: 'after', type: 'date', value: '' }
  ];

  const [verbs, setVerbs] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const languageData = {
  //     Id: language.id,
  //     IsActive: language.isActive,
  //     Name: language.name,
  //     LanguageCountries:isNumberArray(language.languageCountries)===true?language.languageCountries:language.languageCountries.map(x=>x.id)
  //   };
  //   const result = await languageService.createOrUpdateLanguage(languageData);
  //   if (result) await getLanguageList();
  //   setLoading(false);
  //   setOpen(false);
  // };

  const getVerbList = useCallback(async () => {
    setLoading(true);
    let verbs = await verbService.list();
    setVerbs(verbs);
    setLoading(false);
  }, [verbService]);

  const removeVerb = async (id) => {
    const verb=verbs.find((x) => x.id === id);
    alertify.confirm(verb.name, verb.name+' adlı kayıdı silmek istediğinizden emin misiniz?', 
    async function(){ 
      
      await verbService.removeVerb(id);
      getVerbList();
    }, function(){ }).set('labels', {ok:'Sil', cancel:'İptal'});
  };

  useEffect(() => {
    const fetchData = async () => {
      getVerbList();
    };
    fetchData();
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Tooltip title="Fiil Ekle">
        <IconButton onClick={() => {window.location.href="/verb/edit/0";}} color="primary" aria-label="add verb">
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      {/* <Dialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
      </Dialog> */}
      <Table dataSource={verbs} columns={columns} gridStyle={gridStyle} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default Verbs;
