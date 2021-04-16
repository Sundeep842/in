import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { DropzoneDialogBase } from 'material-ui-dropzone'

export default function DropZoneDialog(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <DropzoneDialogBase
      {...field}
      {...rest}
    />
  );
}
