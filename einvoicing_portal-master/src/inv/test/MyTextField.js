import React, { useEffect } from 'react';
import {  useField } from 'formik'
import {
  TextField,
  Button
} from '@material-ui/core'

const MyTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <TextField 
        {...props}
        {...field}
      />
    );
  };

  export default MyTextField