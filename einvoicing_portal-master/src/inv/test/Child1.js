import * as React from 'react';
import { FastField , Field } from 'formik'
import {
    TextField,
    Button
} from '@material-ui/core'
import MyTextField from './MyTextField'

const Child1 = (props) => {

    console.log('Child1')

    return (
        <div>
             <MyTextField name="address" label="Address"/>
        </div>
    );
}

export default React.memo(Child1)