
import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography, Paper, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest } from '../../../../../Request'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RECIPIENT_API_END_URL } from '../../../../constants/Constants'


const RecipientWeb = (props) => {
  let { uid } = useParams();
  const { t } = useTranslation()
  const [data, setData] = useState([]);


  const recipientweb = {
    recipientId:" ",
    url:" ",
    user_name:"",
    password:""
  }

   const _validationSchema = Yup.object().shape({
    recipientId: Yup.string().max(20).required(t('recipientId_required')),
    url: Yup.string().max(20).required(t('url_required')),
    user_name:Yup.string().min(3).max(20).required(t('username_required')),
    password:Yup.string().max(20).required(t('password_required'))
   })

  return (
    <Formik
      initialValues={recipientweb}
      validationSchema={_validationSchema}
      onSubmit={async (values, { setSubmitting}) => {
        let params={
          "recipientId":values.recipientId,
          "url":values.url,
          "user_name":values.user_name,
          "password":values.password
        }
   
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
                <Typography variant='h+' style={{
                  color: "#7f3d9a", fontWeight: "Bold",
                  fontSize: "25px",
                  float: "left"
                }}>WebServices Form</Typography>
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
              name="url"
              fullWidth
              label={t('url')}
              variant="outlined"
              value={values.url}
              error={Boolean(touched.url && errors.url)}
              helperText={touched.url && errors.url}
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
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </div>
        </form>
      )}
    </Formik>


  )
}

export default RecipientWeb
