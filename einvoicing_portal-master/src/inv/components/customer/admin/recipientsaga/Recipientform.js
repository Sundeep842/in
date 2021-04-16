import React, { useEffect , useState } from 'react'
import { TextField, Button, Grid,InputLabel,Select,FormControl, MenuItem } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { useRecipientSlice } from './slice'
import { selectError, selectLoading ,selectIsFormSubmitted,selectRecipientId} from './slice/selectors'
import RecipientEmail from '../recipient/RecipientEmail'
import RecipientFTP from '../recipient/RecipientFTP'
import RecipientWeb from '../recipient/RecipientWeb'
import {Multiselect} from 'multiselect-react-dropdown'

 function Recipientform() {
    const options=[
        {id:'1',name:"07AABCU9603R1ZP"},
        {id:'2',name:"30AABCU9603R1Z0"},
        {id:'3',name:"27AABCU9603R1ZN"}
    ] 
    const dispatch = useDispatch()
    const { actions } = useRecipientSlice()
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    // const isSubmitted = useSelector(selectIsFormSubmitted)
    const { t } = useTranslation()
    const _recipientId  = useSelector(selectRecipientId)
    const [getValue,setGetValue]= useState("");
    const [data,setData]=useState(null)
   
    const params = {
		recipientId: _recipientId,
	}
    const recipients = {
        recipientId: "",
        recipientTag: "",
        deliveryMode: "",
        description: "",
        isActive: 'yes',
        deliveryMechanism: "",
        recipientGstinMappings: ""
      }
   
      const _validationSchema = Yup.object().shape({
        recipientId: Yup.string().max(7).required(t('recipient_id_required')),
        recipientTag: Yup.string().max(15).required(t('recipient_tag_required')),
        // deliveryMode: Yup.string().max(255).required(t('delivery_mode_required')),
        recipientGstinMappings:Yup.string().required(t('GSTN_mapping_require')),
        description:Yup.string().required(t('description_require')),
        isActive:Yup.string().max(255).required(t('is_active_required')),
        // deliveryMechanism:Yup.string().required(t('description_require')),
       })
  const testSubmit=(e)=>{
    console.log("clicked on submit button")
  }
    
       const onSelect=(data)=>{
           console.log(data)
           setData(data)
       }
       const onRemove=(data)=>{
        console.log(data)
        setData(data)
    }

      const submitForm = (values) => {
        console.log(values)
        dispatch(actions.recipient(values))
    }
    const useEffectOnMount = (effect) => {
    	useEffect(effect, []);
  	};

	useEffectOnMount(() => {
        console.log("useeffect mount called")
		dispatch(actions.loadFormDetails());
  	});

      console.dir(params) 
    return (
        <div>
            <h1>Recipient Saga form</h1>
            <Formik
      initialValues={recipients,params}
      validationSchema={_validationSchema}
    onSubmit={(values) => { submitForm(values) }}>
    {({ values, handleChange, handleBlur, handleSubmit, handleReset, touched, errors,handleChanged }) => (
        <form onSubmit={handleSubmit}>
          <div className="form text-center">
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientId"
              fullWidth
              value={values.recipientId}
              margin="normal"
              helperText={touched.recipientId && errors.recipientId}
              error={Boolean(touched.recipientId && errors.recipientId)}
              label={t('recipientId')}
              variant="outlined"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="partnerId"
              fullWidth
              label={t('partnerId')}
              variant="outlined"
              value={values.partnerId}
              error={Boolean(touched.partnerId && errors.partnerId)}
              helperText={touched.partnerId && errors.partnerId}
            />
            </Grid>
            </Grid>
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientTag"
              fullWidth
              label={t('recipientTag')}
              variant="outlined"
              value={values.recipientTag}
              error={Boolean(touched.recipientTag && errors.recipientTag)}
              helperText={touched.recipientTag && errors.recipientTag}
            />
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="description"
              fullWidth
              multiline
              rows={4}
              label={t('description')}
              variant="outlined"
              value={values.description}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
<Grid container spacing={3}>
            <Grid item xs={6}>
              <div className="col-md-6" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined" >
              <InputLabel>{t('is_active')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="isActive"
                label={t('isActive')}
                value={values.isActive}
                color="primary"
                variant="outlined"
                error={Boolean(touched.isActive && errors.isActive)}
                helperText={touched.isActive && errors.isActive}
              >
                <MenuItem value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
                
              </Select>

            </FormControl>
            </div>
            </Grid>

            <Grid item xs={6}>
              <div className="col-md-6" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined" >
              <InputLabel>{t('deliveryMechanism')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="deliveryMechanism"
                label={t('deliveryMechanism')}
                value={values.deliveryMechanism}
                color="primary"
                variant="outlined"
                error={Boolean(touched.deliveryMechanism && errors.deliveryMechanism)}
                helperText={touched.deliveryMechanism && errors.deliveryMechanism}
              >
                <MenuItem value="push">Push</MenuItem>
                <MenuItem value="pull">Pull</MenuItem>
                
              </Select>

            </FormControl>
            </div>
            </Grid>
            </Grid>
          

            <div className="col-md-8" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              {/* <InputLabel>{t('recipientGstinMappings')}</InputLabel> */}
              {/* <label style={{
                    "margin-right": "auto"}}>{t('recipientGstinMappings')}</label> */}
              <Multiselect
          options ={options}
          displayValue= "name"
          onSelect={onSelect}
          onRemove={onRemove}
          label={t('recipientGstinMappings')}
          showCheckbox={true}
          />
              {/* <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="recipientGstinMappings"
                label={t('recipientGstinMappings')}
                value={values.recipientGstinMappings}
                color="primary"
                variant="outlined"
                error={Boolean(touched.recipientGstinMappings && errors.recipientGstinMappings)}
                helperText={touched.recipientGstinMappings && errors.recipientGstinMappings}
              >
                <MenuItem value="07AABCU9603R1ZP">07AABCU9603R1ZP</MenuItem>
                <MenuItem value="30AABCU9603R1Z0">30AABCU9603R1Z0</MenuItem>
                <MenuItem value="27AABCU9603R1ZN">27AABCU9603R1ZN</MenuItem>
              </Select> */}
            </FormControl>
            </div>
        

            <div className="col-md-6" style={{ 'marginTop': '22px'}}> 
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>{t('deliveryMode')}</InputLabel>
              <Select
                id="deliverymode"
                // onChange={handleChange}
                onChange={handleChange=(e)=>{
                    const selectedValue=e.target.value;
        setGetValue(selectedValue)
        console.log(selectedValue)
        console.log(getValue)
                }}
                onBlur={handleBlur}
                name="deliveryMode"
                label={t('deliveryMode')}
                value={values.deliveryMode}
                color="primary"
                variant="outlined"
                error={Boolean(touched.deliveryMode && errors.deliveryMode)}
                helperText={touched.deliveryMode && errors.deliveryMode}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="ftp">FTP</MenuItem>
                <MenuItem value="webservices">WebServices</MenuItem>
              </Select>
              </FormControl>
       
       </div>
        {getValue === 'email'?
    
      <RecipientEmail {...params}/>
         : null }
     {getValue=="ftp"?
    <RecipientFTP />
       :null}
           
         {getValue == "webservices" ?
           <RecipientWeb/>
         :null
        }
        </div>

            <Button 
             type="submit" 
             color="primary"
              disabled={loading}
              onClick={testSubmit}
              className="btn-blue btn-login"
            >Submit
             </Button>
            
         
        </form>
      )}
    </Formik>

        </div>
    )
}
export default Recipientform