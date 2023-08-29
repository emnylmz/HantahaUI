import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CountryService from "../services/CountryService";

import { Popper } from "@mui/material";
import { checkVariableNullOrUndefined } from "../utils/Utils";

export default function CountrySelect(props) {
  const PopperMy = function (props) {
    return (
      <Popper
        {...props}
        placement="bottom"
        sx={{ height: "10px" }}
        style={{ width: props.anchorEl.clientWidth, height: "5px" }}
      />
    );
  };

  const { setCountryId,error } = props;
  const [countries, setCountries] = useState([]);

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

    fetchData();
  }, []);

  return (
    <Autocomplete
      id="country-select"
      name="country"
      options={countries}
      onChange={(event, newValue) => {
        if (checkVariableNullOrUndefined(newValue)) setCountryId("");
        else setCountryId(newValue.id);
      }}
      PopperComponent={PopperMy}
      ListboxProps={{ style: { maxHeight: 150 } }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={option.imageURL}
            srcSet={option.imageURL}
            alt=""
          />
          {option.name}
        </Box>
      )}
      noOptionsText="Sonuç Yok"
      renderInput={(params) => (
        <TextField
        
          error={error}
          {...params}
          label="Ülke seçiniz"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
