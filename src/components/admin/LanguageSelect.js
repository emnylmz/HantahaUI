import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Popper } from "@mui/material";
import { checkVariableNullOrUndefined } from "../../utils/utils";

export default function LanguageSelect(props) {
  console.log(props.languages)
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
  const { setLanguageId } = props;

  return (
    <Autocomplete
      id="language-select"
      name="language"
      options={props.languages}
      defaultValue={props.languages.find(x=>x.id==props.languageId)}
      onChange={(event, newValue) => {
        if (checkVariableNullOrUndefined(newValue)) setLanguageId("");
          else setLanguageId(newValue.id);
      }}
      PopperComponent={PopperMy}
      ListboxProps={{ style: { maxHeight: 150 } }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      noOptionsText="Sonuç Yok"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Dil Seçiniz *"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}
