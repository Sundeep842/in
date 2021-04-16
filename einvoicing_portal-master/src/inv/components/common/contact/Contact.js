import React, { useState, useEffect } from 'react'
import { TextField, Button, InputAdornment, Grid, Typography, Paper } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest } from '../../../../Request'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { LOGIN_ACTION } from '../../../actions/Action'
import { ENQUIRY_API_END_URL } from '../../../constants/Constants'
import SendIcon from '@material-ui/icons/Send';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import './contact.css';

const Contact = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [contactError, setContactError] = useState(null)
  const formMetadata = {
    name: "",
    contactNo: "",
    email: "",
    message: "",
    status: "Inprogress"
  }
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(20).required(t('name_required')),
    contactNo: Yup.string().min(10).max(15).required(t('contact_no_required')),
    email: Yup.string().email(t('param_email_invalid')).required(t('param_require')),
    message: Yup.string().max(255).required(t('message_required'))
  })

  return (<div className="contact-container">
    <div className="right">
      <div className="login-box">
        <Formik
          initialValues={formMetadata}
          validationSchema={formValidationSchema}
          onSubmit={async (values, { setSubmitting, setFieldValue, setFieldTouched }) => {
            setSubmitting(true)
            try {
              let _contact = await invokeAPIRequest(ENQUIRY_API_END_URL, {
                name: values.name,
                contactNo: values.contactNo,
                email: values.email,
                message: values.message,
                status: "Inprogress"
              }, false);

              let _payload = {
                name: _contact.results.userId,
                securityToken: _contact.results.securityToken,
                partnerId: _contact.results.partnerId,
                partnerName: _contact.results.partnerName,
                roles: _contact.results.roles
              }
              dispatch({
                type: LOGIN_ACTION,
                payload: _payload
              });
              //    navigate(`/app/${_login.results.roles[0]}/dashboard`, { replace: true })
            } catch (error) {
              let message = t(error.errorCode)
              setContactError(message)
              setSubmitting(false)
              setFieldValue('name', '')
              setFieldTouched('name', false)
              setFieldValue('contactNo', '')
              setFieldTouched('contactNo', false)
              setFieldValue('email', '')
              setFieldTouched('email', false)
              setFieldValue('message', '')
              setFieldTouched('message', false)
            }
          }}
        >
          {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="form text-center">
                <div className="logo ">
                  <div className="col-md-12">
                    <Grid align="center">
                      <Typography variant='h3' style={{
                        color: "#7f3d9a",fontWeight: "Bold",
                        fontSize: "34px",
                        float: "left"
                      }}> Get in Touch</Typography>
                    </Grid>
                  </div>

                </div>
                <TextField
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="name"
                  // placeholder={t('name_enter')}
                  fullWidth
                  value={values.name}
                  margin="normal"
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                  label={t('name_enter')}
                  variant="outlined"

                />

                <TextField
                  className="mt-20"
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="contactNo"
                  //   placeholder={t('contactNo_enter')}
                  fullWidth
                  label={t('contactNo_enter')}
                  variant="outlined"
                  value={values.contactNo}
                  error={Boolean(touched.contactNo && errors.contactNo)}
                  helperText={touched.contactNo && errors.contactNo}
                />
                <TextField
                  className="mt-20"
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  //   placeholder={t('email_enter')}
                  fullWidth
                  label={t('email_enter')}
                  variant="outlined"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  className="mt-20"
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="message"
                  //   placeholder={t('message_enter')}
                  fullWidth
                  multiline
                  rows={4}
                  label={t('message_enter')}
                  variant="outlined"
                  value={values.message}
                  error={Boolean(touched.message && errors.message)}
                  helperText={touched.message && errors.message}
                />
                
                <React.Fragment>
                  <Button color="secondary" type="submit" disabled={isSubmitting}
                    className="btn-blue btn-login"
                  >Send
                  </Button>
                </React.Fragment>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  </div>)
}

export default Contact
