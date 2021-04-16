import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography, Paper, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest, invokeAPIGetRequest } from '../../../../Request'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { RECIPIENT_API_END_URL } from '../../../constants/Constants'
import './enquiry.css';

const RecipientView = (props) => {
  let { uid } = useParams();
  
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const formMetadata = {
    

  }

  const formValidationSchema = Yup.object().shape({

  })
  useEffect(async () => {
    try {
      let url = RECIPIENT_API_END_URL + "/";
      const _recipientview = await invokeAPIGetRequest(url + uid, {}, true);
      console.log("RESPONE Data get by ID: ")
      console.log(_recipientview)
      console.log(_recipientview.results)
      let resultsss = _recipientview.results
      console.log(resultsss)
      setDisplay(resultsss)
      console.log(display)
      console.log(display.name)
    } catch (error) {
      let message = t(error.errorCode)

    }
  }, [])

  return (
    <Formik
      initialValues={formMetadata}
      validationSchema={formValidationSchema}
    //   onSubmit={async (values, { setSubmitting, setFieldValue, setFieldTouched }) => {
    //     setSubmitting(true)
    //     try {
    //       let url = RECIPIENT_API_END_URL + "/1";
    //       const _data = await invokeAPIRequest(url, {
    //         action: "",
    //         actionBy: '100001',
    //         remarks: values.remarks
    //       }, false);
    //       console.log(values.remarks)
    //       console.log("RESPONE Data get by ID: ")
    //       console.log(_data)
    //       setData(_data)
    //       console.log(data)
    //     } catch (error) {
    //       let message = t(error.errorCode)
    //       setFieldTouched('status', '')
    //       setFieldTouched('status', false)
    //       setFieldTouched('remarks', '')
    //       setFieldTouched('remarks', false)
    //     }
    //   }
    //   }
    >
      {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="form text-center">
            {/* <div className="logo ">
              <div className="col-md-12">
                <Typography variant='h6' style={{
                  color: "#7f3d9a", fontWeight: "Bold",
                  fontSize: "34px",
                  float: "left"
                }}> Recipient View</Typography>
              </div>
            </div> */}
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientId"
              // placeholder={t('name_enter')}
              fullWidth
              value={display.recipientId||''}
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
              //   placeholder={t('contactNo_enter')}
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
              //   placeholder={t('email_enter')}
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
              //   placeholder={t('message_enter')}
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
              <div className="col-md-6" style={{ 'margin-top': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined" >
              <InputLabel>{t('is_active')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="is_active"
                label={t('is_active')}
                value={values.is_active}
                color="primary"
                variant="outlined"
                error={Boolean(touched.is_active && errors.is_active)}
                helperText={touched.is_active && errors.is_active}
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
                
              </Select>

            </FormControl>
            </div>
            </Grid>

            <Grid item xs={6}>
            <div className="col-md-6" style={{ 'margin-top': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>{t('GSTN_mapping')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="GSTN_mapping"
                label={t('GSTN_mapping')}
                value={values.status}
                color="primary"
                variant="outlined"
                error={Boolean(touched.GSTN_mapping && errors.GSTN_mapping)}
                helperText={touched.GSTN_mapping && errors.GSTN_mapping}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>

            </FormControl>
            </div>
            </Grid>
            </Grid>
            <div className="col-md-6" style={{ 'margin-top': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>{t('deliveryMode')}</InputLabel>
              <Select
                id="deliverymode"
                onChange={handleChanged}
                onBlur={handleBlur}
                name="deliveryMode"
                label={t('deliveryMode')}
                value={values.status}
                color="primary"
                variant="outlined"
                error={Boolean(touched.deliveryMode && errors.deliveryMode)}
                helperText={touched.deliveryMode && errors.deliveryMode}
              >
                <option value="email">Email</option>
                <option value="ftp">FTP</option>
                <option value="webservices">WebServices</option>
              </Select>
              </FormControl>
       
       </div>
        {getValue === 'email'?
    
      <RecipientEmail/>
         : null }
     {getValue=="ftp"?
    <RecipientFTP/>
       :null}
           
         {getValue == "webservices" ?
           <RecipientWeb/>
         :null
        }
        </div>
           
            <Button color="secondary" type="submit" disabled={isSubmitting}
              className="btn-blue btn-login"
            >Reply
                  </Button>
        
        </form>
      )}
    </Formik>


  )
}

export default RecipientView
