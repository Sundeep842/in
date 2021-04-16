import React from 'react';
import { Checkbox  , FormControl   , FormControlLabel } from '@material-ui/core';

export default function CheckBoxField(props) {

  const { label , name } = props

  return (
    <FormControl>
      <FormControlLabel
        control={
                  <Checkbox 
                    name={name} />
                }
        label={label}
      />
      
    </FormControl>
  );
}
