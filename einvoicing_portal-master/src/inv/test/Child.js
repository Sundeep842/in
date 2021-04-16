import * as React from 'react';
import MyTextField from './MyTextField'

const Child = (props) => {

    console.log('Child')

    return (
        <div>
                <MyTextField name="name" label="Name"/>
        </div>
    );
}

export default React.memo(Child)