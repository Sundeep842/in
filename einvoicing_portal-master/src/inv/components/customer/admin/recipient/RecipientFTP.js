
import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography, Paper, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest } from '../../../../../Request'
import {  useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RECIPIENT_API_END_URL } from '../../../../constants/Constants'


const RecipientFTP = (props) => {
  let { uid } = useParams();
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const recipientftp = {
    recipientId:" ",
    ftp_server:" ",
    ftp_location:"",
    user_name:"",
    password:""
  }

 
   const formValidationSchema = Yup.object().shape({
    recipientId: Yup.string().max(7).required(t('recipientId_required')),
    ftp_server: Yup.string().max(15).required(t('ftp_server_required')),
    ftp_location:Yup.string().required(t('ftp_location_require')),
    user_name:Yup.string().required(t('user_name_require')),
    password:Yup.string().max(255).required(t('password_required')),
   })

  return (
    <Formik
      initialValues={recipientftp}
      validationSchema={formValidationSchema}
      onSubmit={async (values, { setSubmitting}) => {
        let params={
          "recipientId":values.recipientId,
          "ftp_server":values.ftp_server,
          "ftp_location":values.ftp_location,
          "user_name":values.user_name,
          "password":values.password
        }
        // setSubmitting(true)
          const _data = await invokeAPIRequest(RECIPIENT_API_END_URL,params,true,"post");
          console.log("RESPONE Data get by ID: ")
          console.log(_data)
          setData(_data)
          console.log(data)
      }
      }
    >
      {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="form text-center">
            {/* <div className="logo ">
              <div className="col-md-12">
                <Typography variant='h6' style={{
                  color: "#7f3d9a", fontWeight: "Bold",
                  fontSize: "25px",
                  float: "left"
                }}>FTP Form</Typography>
              </div>
            </div> */}
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
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="ftp_server"
              fullWidth
              label={t('ftp_server')}
              variant="outlined"
              value={values.ftp_server}
              error={Boolean(touched.ftp_server && errors.ftp_server)}
              helperText={touched.ftp_server && errors.ftp_server}
            />
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="ftp_location"
              fullWidth
              label={t('ftp_location')}
              variant="outlined"
              value={values.ftp_location}
              error={Boolean(touched.ftp_location && errors.ftp_location)}
              helperText={touched.ftp_location && errors.ftp_location}
            />
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="user_name"
              fullWidth
              label={t('user_name')}
              variant="outlined"
              value={values.user_name}
              error={Boolean(touched.user_name && errors.user_name)}
              helperText={touched.user_name && errors.user_name}
            />
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              fullWidth
              label={t('password')}
              variant="outlined"
              value={values.ftp_server}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>
        </form>
      )}
    </Formik>


  )
}

export default RecipientFTP
