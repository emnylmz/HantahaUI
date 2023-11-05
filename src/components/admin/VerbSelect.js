import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Popper } from '@mui/material';
import { checkVariableNullOrUndefined } from '../../utils/utils';

export default function VerbSelect(props) {
  const PopperMy = function (props) {
    return <Popper {...props} placement="bottom" sx={{ height: '10px' }} style={{ width: props.anchorEl.clientWidth, height: '5px' }} />;
  };
  const { setVerbIds,verbIds } = props;

  return (
    <Autocomplete
      id={props.index != undefined ? 'verb-select' + props.index : 'verb-select'}
      name="verb"
      options={props.verbs}
      multiple={props.multiple == undefined ? false : true}
      defaultValue={props.multiple===undefined?null:verbIds ===undefined ?[]:verbIds}
      value={props.multiple===undefined?null:verbIds ===undefined ?[]:verbIds}
      onChange={(event, newValue) => {
        if (props.multiple == undefined) {
          if (checkVariableNullOrUndefined(newValue)) setVerbIds('');
          else setVerbIds(newValue.id);
        } else {
          if (newValue.length == 0) setVerbIds([]);
          else setVerbIds(newValue);
        }
      }}
      PopperComponent={PopperMy}
      ListboxProps={{ style: { maxHeight: 150 } }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      noOptionsText="Sonuç Yok"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Fiil Seçiniz *"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
        />
      )}
    />
  );
}
