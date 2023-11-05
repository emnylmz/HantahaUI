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
import UndoIcon from '@mui/icons-material/Undo';

const verbService = new VerbService();

const Verbs = () => {
  TabTitle('HantahaAdmin | Fiiller');
  const columns = [
    {
      name: 'id',
      header: '',
      defaultFlex: 0.5,
      render: ({ value }) => {
        return (
          <>
            <Tooltip title="Düzenle">
              <IconButton aria-label="edit" size="small" onClick={() => (window.open('/verb/edit/' + value,'_blank'))}>
                <EditIcon color="primary" fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {verbs.find((x) => x.id === value).isDeleted === false ? (
              <Tooltip title="Sil">
                <IconButton onClick={() => setIsDeleted(value)} aria-label="edit" size="small">
                  <DeleteIcon sx={{ color: pink[500] }} fontSize="inherit" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Geri Al">
                <IconButton aria-label="edit" size="small" onClick={() => setIsDeleted(value)}>
                  <UndoIcon color="primary" fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      }
    },
    { name: 'name', header: 'Grup Adı', minWidth: 50, defaultFlex: 1 },
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

  const rowClassName = ({data})=> {
    if (data.isDeleted === true) {
      return "global-custom-row-dark-magenta global-custom-row"
    }
  }

  const getVerbList = useCallback(async () => {
    setLoading(true);
    let verbs = await verbService.list();
    setVerbs(verbs);
    setLoading(false);
  }, [verbService]);

  const setIsDeleted = async (id) => {
    const verb = verbs.find((x) => x.id === id);
    const phrase=verb.isDeleted===false?' silmek':'geri almak';
    const button=verb.isDeleted===false?'Sil':'Geri Al';
    alertify
      .confirm(
        verb.name,
        verb.name + ' adlı kaydı'+phrase +' istediğinizden emin misiniz?',
        async function () {
          await verbService.setIsDeletedVerb(id,verb.isDeleted);
          getVerbList();
        },
        function () {}
      )
      .set('labels', { ok: button, cancel: 'İptal' });
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
        <IconButton
          onClick={() => {
            window.open('/verb/edit/0','_blank')
          }}
          color="primary"
          aria-label="add verb"
        >
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Table dataSource={verbs} rowClassName={rowClassName} columns={columns} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default Verbs;
