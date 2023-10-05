import MainCard from 'components/admin/cards/MainCard';
import React from 'react';
import { TabTitle } from 'utils/Utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageService from 'services/LanguageService';
import { useState } from 'react';
import BackDrop from 'components/BackDrop';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import CountryService from 'services/CountryService';
import CountrySelect from 'components/admin/CountrySelect';

export default function LanguageEdit() {
  TabTitle('HantahaAdmin | Dil Düzenle');

  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState({});
  const [countries, setCountries] = useState([]);

  const languageService = new LanguageService();
  let { id } = useParams();
  const languageId = parseInt(id);

  let getLanguage = async (id) => {
    setLoading(true);
    let result = await languageService.getLanguage(id);
    setLanguage(result);
    setLoading(false);
  };


  let getAllCountries = async () => {
    const countryService = new CountryService();
    var data = await countryService.getAllCountries();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountries = await getAllCountries();
      setCountries(fetchedCountries);
    };

    if (isNaN(languageId)) window.location.href = '/language';
    else
    {
      getLanguage(languageId);
      
  
      fetchData();
    } 
  }, []);

  return (
    <MainCard>
      <BackDrop loading={loading} />
      {!loading && language && (
        <>
          {language.name}
          <Typography gutterBottom>
            <FormControlLabel
              control={
                <Checkbox
                  checked={language.isActive}
                  color="primary"
                  onChange={() =>
                    setLanguage((p) => ({
                      ...p,
                      isActive: !p.isActive
                    }))
                  }
                />
              }
              label="Aktif mi?"
            />
          </Typography>
          
          <Grid item xs={12}>
                  <CountrySelect
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
        </>
      )}
    </MainCard>
  );
}
