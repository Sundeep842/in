import React, { useEffect } from 'react';
import { Formik, Form, FastField ,Field , useField } from 'formik'
import {
  TextField,
  Button
} from '@material-ui/core'
import Child from './Child'
import Child1 from './Child1'

 


export default function RD() {

  const _fields = {
    name: '',
    address: ''
  }

 
  return (
    <div>
      <Formik
        initialValues={_fields}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {() => (
          <div>
            <Form>
              <Child />
              <Child1 />
              <Button
                type="submit"
                variant="contained"
              >Submit</Button>
            </Form>
          </div>

        )}
      </Formik>
    </div>
  );
}
