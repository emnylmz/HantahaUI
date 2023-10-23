import MainCard from 'components/admin/cards/MainCard';
import React from 'react';
import { TabTitle, checkStringVariableEmpty, checkVariableNullOrUndefined } from 'utils/utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VerbService from 'services/VerbService';
import { useState } from 'react';
import BackDrop from 'components/BackDrop';
import LanguageSelect from 'components/admin/LanguageSelect';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import SentenceService from 'services/SentenceService';
import VerbSelect from 'components/admin/VerbSelect';
import LanguageService from 'services/LanguageService';

export default function SentenceEdit() {
  TabTitle('HantahaAdmin | Cümle Düzenle');

  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [sentence, setSentence] = useState({ id: 0, name: '', isActive: true, sentenceItems: [], verbs: [] });
  const [verbs, setVerbs] = useState([]);
  const [languages, setLanguages] = useState([]);

  const languageService = new LanguageService();
  const verbService = new VerbService();
  const sentenceService = new SentenceService();

  let { id } = useParams();
  const sentenceId = parseInt(id);

  let getVerbs = async () => {
    let result = await verbService.comboList();
    setVerbs(result);
  };

  let getLanguages = async () => {
    let result = await languageService.comboList();
    setLanguages(result);
  };

  let getSentence = async () => {
    let result = await sentenceService.getSentence(sentenceId);
    setSentence(result);
    setIsValid(true);
  };

  let addSentenceItem = () => {
    const newSentenceItem = { id: 0, languageId: 0, context: '' };

    const updatedSentence = { ...sentence };
    updatedSentence.sentenceItems.push(newSentenceItem);

    setSentence(updatedSentence);
    setIsValid(false);
  };

  let removeItem = (index) => {
    const updatedSentence = { ...sentence };
    updatedSentence.sentenceItems.splice(index, 1);
    setSentence(updatedSentence);
    validate();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const sentenceData = {
      Id: sentence.id,
      Name: sentence.name,
      IsActive: sentence.isActive,
      SentenceItems: sentence.sentenceItems,
      VerbIds: sentence.verbs.map(x=>x.id)
    };

    await sentenceService.createOrUpdateSentence(sentenceData);
    setLoading(false);
  };

  const validate = () => {
    if (checkVariableNullOrUndefined(sentence.name) || checkStringVariableEmpty(sentence.name)) {
      setIsValid(false);
      return;
    }

    for (const sentenceItem of sentence.sentenceItems) {
      if (
        checkVariableNullOrUndefined(sentenceItem.context) ||
        checkStringVariableEmpty(sentenceItem.context) ||
        checkVariableNullOrUndefined(sentenceItem.languageId) ||
        checkStringVariableEmpty(sentenceItem.languageId) ||
        sentenceItem.languageId === 0
      ) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  };

  useEffect(() => {
    if (isNaN(sentenceId)) window.location.href = '/sentence';
    else {
      setLoading(true);
      getLanguages();
      getVerbs();
      if (sentenceId !== 0) getSentence();
      setLoading(false);
    }
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      <Typography component="h2" variant="h3" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Cümle Ekle/Güncelle
      </Typography>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="groupName"
                required
                value={sentence.name}
                fullWidth
                inputProps={{
                  maxLength: 50
                }}
                onChange={(e) => {
                  setSentence((prevData) => ({
                    ...prevData,
                    name: e.target.value
                  }));
                }}
                label="Grup Adı"
              />

              <Tooltip title="Dil Ekle">
                <IconButton className="marginTop5" onClick={() => addSentenceItem()} color="primary" aria-label="add sentence">
                  <AddCircleIcon fontSize="medium" />

                  <div style={{ fontSize: 'large' }}> Dil Ekle</div>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={4}>
                <VerbSelect
                  verbIds={sentence.verbs}
                  multiple={true}
                  verbs={verbs}
                  setVerbIds={(e) => {
                    setSentence((p) => ({
                      ...p,
                      verbs: e
                    }));
                  }}
                />
              
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography gutterBottom>
                <FormControlLabel
                  id="isActive"
                  control={
                    <Checkbox
                      checked={sentence.isActive}
                      color="primary"
                      onChange={() => {
                        setSentence((p) => ({
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

          {sentence.sentenceItems.map((sentenceItem, index) => (
            <div key={index}>
              <Grid container spacing={2} className="marginTop5">
                <Grid item xs={12} sm={4}>
                  {!loading ? (
                    <LanguageSelect
                      index={index}
                      languageId={sentence.sentenceItems[index].languageId}
                      languages={languages}
                      setLanguageId={(e) => {
                        const updatedSentence = { ...sentence };
                        updatedSentence.sentenceItems[index].languageId = e;
                        setSentence(updatedSentence);
                        validate();
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    id={'context-' + index}
                    required
                    fullWidth
                    multiline
                    value={sentenceItem.context}
                    inputProps={{
                      maxLength: 500
                    }}
                    onChange={(e) => {
                      const updatedSentence = { ...sentence };
                      updatedSentence.sentenceItems[index].context = e.target.value;
                      setSentence(updatedSentence);
                      validate();
                    }}
                    label="Cümle"
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
      ) : (
        <></>
      )}
    </MainCard>
  );
}
