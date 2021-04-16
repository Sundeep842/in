import React from 'react';
import { FastField } from 'formik';
import { at } from 'lodash';
import { TextField } from '@material-ui/core';


const InputField = (props) => {
  return (
    <FastField
      name={props.name}
    >
      {({ field, meta }) => {
        function _renderHelperText() {
          const [touched, error] = at(meta, 'touched', 'error');
          if (touched && error) {
            return error;
          }
        }
        return (
          <TextField
            type="text"
            label={props.label}
            error={meta.touched && meta.error && true}
            {...field}
            {...props}
            helperText={_renderHelperText()}
            fullWidth
          />
        )}
      }
    </FastField>
  )
}
export default React.memo(InputField)

/*export default function InputField(props) {
 console.log('this is called')
 const { errorText, ...rest } = props;
 const [field, meta] = useField(props);

 function _renderHelperText() {
   const [touched, error] = at(meta, 'touched', 'error');
   if (touched && error) {
     return error;
   }
 }
 return (
   <TextField
     type="text"
     label={props.label}
     error={meta.touched && meta.error && true}
     helperText={_renderHelperText()}
     {...field}
     {...rest}
     fullWidth
   />
 );
}*/

