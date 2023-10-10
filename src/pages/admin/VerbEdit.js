import MainCard from 'components/admin/cards/MainCard';
import React from 'react';
import { TabTitle } from 'utils/utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageService from 'services/LanguageService';
import { useState } from 'react';
import BackDrop from 'components/BackDrop';
import LanguageSelect from 'components/admin/LanguageSelect';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import VerbService from 'services/VerbService';
// import CountrySelect from 'components/admin/CountrySelect';

export default function VerbEdit() {
  TabTitle('HantahaAdmin | Fiil Düzenle');

  const [loading, setLoading] = useState(true);
  const [verb, setVerb] = useState({ id: 0, name: '', isActive: true, verbItems: [] });
  const [languages, setLanguages] = useState([]);

  const languageService = new LanguageService();
  const verbService = new VerbService();
  let { id } = useParams();
  const verbId = parseInt(id);

  let getLanguages = async () => {
    let result = await languageService.comboList();
    setLanguages(result);
  };

  let getVerb = async () => {
    let result = await verbService.getVerb(verbId);
    setVerb(result);
  };

  let addVerbItem = () => {
    const newVerbItem = { id: 0, languageId: 0, context: '' };

    const updatedVerb = { ...verb };
    updatedVerb.verbItems.push(newVerbItem);

    setVerb(updatedVerb);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const verbData = {
      Id: verb.id,
      Name: verb.name,
      IsActive: verb.isActive,
      VerbItems: verb.verbItems
    };
    const result = await verbService.createOrUpdateVerb(verbData);
    if (result) window.location.href = '/verb';
    setLoading(false);
  };

  useEffect(() => {
    if (isNaN(verbId)) window.location.href = '/verb';
    else {
      if (verbId !== 0) getVerb();

      getLanguages();
      setLoading(false);
      console.log(languages);
    }
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Typography component="h2" variant="h3" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Fiil Ekle/Güncelle
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={verb.name}
            fullWidth
            inputProps={{
              maxLength: 50
            }}
            onChange={(e) => {
              setVerb((prevData) => ({
                ...prevData,
                name: e.target.value
              }));
            }}
            label="Grup Adı"
          />
          <Tooltip title="Dil Ekle">
            <IconButton onClick={() => addVerbItem()} color="primary" aria-label="add verb">
              <AddCircleIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Dil Ekle">
            <IconButton onClick={() => console.log(verb)} color="primary" aria-label="add verb">
              <AddCircleIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>
            <FormControlLabel
              control={
                <Checkbox
                  checked={verb.isActive}
                  color="primary"
                  onChange={() =>
                    setVerb((p) => ({
                      ...p,
                      isActive: !p.isActive
                    }))
                  }
                />
              }
              label="Aktif mi?"
            />
          </Typography>
        </Grid>
      </Grid>

      {verb.verbItems.map((verbItem, index) => (
        <div key={index}>
          <Grid container spacing={2} style={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={4}>
              <LanguageSelect
                languageId={verb.verbItems[index].languageId}
                languages={languages}
                setLanguageId={(e) => {
                  const updatedVerb = { ...verb };
                  updatedVerb.verbItems[index].languageId = e;
                  setVerb(updatedVerb);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                multiline
                value={verbItem.context}
                inputProps={{
                  maxLength: 300
                }}
                onChange={(e) => {
                  const updatedVerb = { ...verb };
                  updatedVerb.verbItems[index].context = e.target.value;
                  setVerb(updatedVerb);
                }}
                label="Fiil"
              />
            </Grid>
          </Grid>
        </div>
      ))}
      <Button disabled={loading} style={{ marginTop: '5px' }} variant="contained" autoFocus onClick={handleSubmit}>
        Kaydet
      </Button>
    </MainCard>
  );
}
