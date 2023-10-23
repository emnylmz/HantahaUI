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
import UndoIcon from '@mui/icons-material/Undo';
import SentenceService from 'services/SentenceService';

const sentenceService = new SentenceService();

const Sentences = () => {
  TabTitle('HantahaAdmin | Cümleler');
  const columns = [
    {
      name: 'id',
      header: '',
      defaultFlex: 0.5,
      render: ({ value }) => {
        return (
          <>
            <Tooltip title="Düzenle">
              <IconButton aria-label="edit" size="small" onClick={() => (window.location.href = '/sentence/edit/' + value)}>
                <EditIcon color="primary" fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {sentences.find((x) => x.id === value).isDeleted === false ? (
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

  const gridStyle = { minHeight: 550 };

  const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'createdBy', operator: 'startsWith', type: 'string', value: '' },
    { name: 'updatedOn', operator: 'after', type: 'date', value: '' },
    { name: 'createdOn', operator: 'after', type: 'date', value: '' }
  ];

  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);

  const rowClassName = ({data})=> {
    if (data.isDeleted === true) {
      return "global-custom-row-dark-magenta global-custom-row"
    }
  }

  const getSentenceList = useCallback(async () => {
    setLoading(true);
    let sentences = await sentenceService.list();
    setSentences(sentences);
    setLoading(false);
  }, [sentenceService]);

  const setIsDeleted = async (id) => {
    const sentence = sentences.find((x) => x.id === id);
    const phrase=sentence.isDeleted===false?' silmek':'geri almak';
    const button=sentence.isDeleted===false?'Sil':'Geri Al';
    alertify
      .confirm(
        sentence.name,
        sentence.name + ' adlı kaydı'+phrase +' istediğinizden emin misiniz?',
        async function () {
          await sentenceService.setIsDeleted(id,sentence.isDeleted);
          getSentenceList();
        },
        function () {}
      )
      .set('labels', { ok: button, cancel: 'İptal' });
  };

  useEffect(() => {
    const fetchData = async () => {
      getSentenceList();
    };
    fetchData();
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Tooltip title="Cümle Ekle">
        <IconButton
          onClick={() => {
            window.open('/sentence/edit/0','_blank')
          }}
          color="primary"
          aria-label="add sentence"
        >
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Table dataSource={sentences} rowClassName={rowClassName} columns={columns} gridStyle={gridStyle} defaultFilterValue={defaultFilterValue} />
    </MainCard>
  );
};

export default Sentences;
