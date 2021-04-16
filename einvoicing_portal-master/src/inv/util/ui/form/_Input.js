import React from 'react';
import { FastField } from 'formik';
import { Input } from '@material-ui/core';



const _Input = (props) => {
  console.log('called')
  return (
    <FastField
      name={props.label}
    >
      {({ field, meta }) => (
        <Input
          type="text"
          label={props.label}
          error={meta.touched && meta.error && true}
          {...field}
          {...props}
          helperText={() => {
            if (meta.touched && meta.error) {
              return meta.error;
            }
          }}
          fullWidth
        />
      )}
    </FastField>
  )
}

export default React.memo(_Input)