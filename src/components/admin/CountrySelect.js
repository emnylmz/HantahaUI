import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Popper } from "@mui/material";
import { checkVariableNullOrUndefined } from "../../utils/Utils";

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

  return (
    <Autocomplete
      // isOptionEqualToValue={(option, value) => option.id == value.countryId}
      id="country-select"
      name="country"
      options={props.countries}
      multiple={props.multiple==undefined ?false:true}
      defaultValue={props.countryIds ===undefined ?[]:props.countryIds}
      onChange={(event, newValue) => {
        if(props.multiple==undefined)
        {
          if (checkVariableNullOrUndefined(newValue)) setCountryId("");
          else setCountryId(newValue.id);
        }
        else
        {
          if(newValue.length==0) setCountryId([]);
          else setCountryId(newValue.map(item => item.id));
        }
        
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
          label="Ülke Seçiniz *"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}
