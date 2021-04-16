import React , { useEffect , useState }from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';
import {LOOKUP_FIELDS} from '../../../constants/Constants'
import {invokeGetRequest} from '../../../../Request'



function SelectField(props) {
  const { label, fieldOf , dependentOn , dependentValue , moduleName ,...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  const [data,setData] = useState([])

  useEffect(()=>{
    let URL = LOOKUP_FIELDS.concat("?fieldName=").concat(fieldOf).concat("&moduleName=").concat(moduleName)
    invokeGetRequest(URL,{},false)
    .then((response) => {
      if(response && response.hasError === false) {
        let _data = []
        response.results.map((result) => {
          _data.push({
            label : result.fieldValue.trim(),
            value : result.fieldValue.trim()
          })
        })
        setData(_data)
      }
    })
    .catch((error) => {
    })
  },[])

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl variant="standard" fullWidth {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select  {...field} label={label} value={selectedValue ? selectedValue : ''} >
        {data && data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>

  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectField;
