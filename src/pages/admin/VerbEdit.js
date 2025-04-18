import MainCard from 'components/admin/cards/MainCard';
import React from 'react';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined } from 'utils/utils';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

export default function VerbEdit() {
  TabTitle('HantahaAdmin | Fiil Düzenle');

  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
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
    setIsValid(true);
  };

  let addVerbItem = () => {
    const newVerbItem = { id: 0, languageId: 0, context: '' };

    const updatedVerb = { ...verb };
    updatedVerb.verbItems.push(newVerbItem);

    setVerb(updatedVerb);
    setIsValid(false);
  };

  let removeItem = (index) => {
    const updatedVerb = { ...verb };
    verb.verbItems.splice(index, 1);
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
    await verbService.createOrUpdateVerb(verbData);
    setLoading(false);
  };

  const validate = () => {
    if (checkVariableNullOrUndefined(verb.name) || checkStringVariableEmpty(verb.name)) {
      setIsValid(false);
      return;
    }

    for (const verbItem of verb.verbItems) {
      if (
        checkVariableNullOrUndefined(verbItem.context) ||
        checkStringVariableEmpty(verbItem.context) ||
        checkVariableNullOrUndefined(verbItem.languageId) ||
        checkStringVariableEmpty(verbItem.languageId) || verbItem.languageId===0
      ) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  };

  useEffect(() => {
    if (isNaN(verbId)) window.location.href = '/verb';
    else {
      if (verbId !== 0) getVerb();

      getLanguages();
      setLoading(false);
    }
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Typography component="h2" variant="h3" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Fiil Ekle/Güncelle
      </Typography>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              id="groupName"
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
                <IconButton className="marginTop5" onClick={() => addVerbItem()} color="primary" aria-label="add verb">
                  <AddCircleIcon fontSize="medium" />

                  <div style={{ fontSize: 'large' }}> Dil Ekle</div>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                <FormControlLabel
                  id="isActive"
                  control={
                    <Checkbox
                      checked={verb.isActive}
                      color="primary"
                      onChange={() => {
                        setVerb((p) => ({
                          ...p,
                          isActive: !p.isActive
                        }));
                        validate();
                      }}
                    />
                  }
                  label="Aktif mi?"
                />
              </Typography>
            </Grid>
          </Grid>

          {verb.verbItems.map((verbItem, index) => (
            <div key={index}>
              <Grid container spacing={2} className="marginTop5">
                <Grid item xs={12} sm={4}>
                  {!loading ?<LanguageSelect
                  index={index}
                    languageId={verb.verbItems[index].languageId}
                    languages={languages}
                    setLanguageId={(e) => {
                      const updatedVerb = { ...verb };
                      updatedVerb.verbItems[index].languageId = e;
                      setVerb(updatedVerb);
                      validate();
                    }}
                  />:<></>}
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    id={"context-"+index}
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
                      validate();
                    }}
                    label="Fiil"
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Tooltip title="Sil">
                    <IconButton onClick={() => removeItem(index)} aria-label="edit" size="small">
                      <DeleteIcon sx={{ color: pink[500] }} fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          ))}
          <Button disabled={!isValid || loading} className="marginTop15" variant="contained" autoFocus onClick={handleSubmit}>
            Kaydet
          </Button>
        </>
      ) : <></>}
    </MainCard>
  );
}
