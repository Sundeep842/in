import React, { useEffect } from 'react'
import {
  Grid,
  TextField,
  Button, Select, InputLabel, FormControl, MenuItem
} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import logosmall from '../../../../images/logosmall.png';
import socialmedia from '../../../../images/socialmedia.png';
import '../Styles.css';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useDispatch, useSelector } from "react-redux"
import { useEnquirySlice } from './slice'
import { selectError, selectLoading } from './slice/selectors'

const EnquirySaga = () => {
  const fields = {
    name: '',
    contactNo: '',
    email: '',
    message: '',
    partnerType: '',
    status:'Inprogress',
  }

  const dispatch = useDispatch()
  const { actions } = useEnquirySlice()
  const isLoading = useSelector(selectLoading)
  const { t } = useTranslation()
  const navigation = useNavigate()
  const error = useSelector(selectError)

  const _validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(20).required(t('name_required')),
    contactNo: Yup.string().min(10).max(15).required(t('contact_no_required')),
    email: Yup.string().email(t('param_email_invalid')).required(t('param_require')),
    message: Yup.string().max(500).required(t('message_required')),
    partnerType: Yup.string().required(t('param_require')),
  })


  const submitForm = (values) => {
    console.log(values)
    dispatch(actions.enquiry(values))

  }
  const facebookclick = (e) => {

    window.location.href = "https://www.facebook.com/"
    console.log("facebook icon clicked")

  }
  const twitterclick = (e) => {
    window.location.href = "https://twitter.com/login?lang=en"
    console.log("twitter")
  }
  const linkedclick = (e) => {
    window.location.href = "https://www.linkedin.com/login"
    console.log("linked")
  }
  const countWords = (e) => {
    var val = e.target.value;
    console.log(val.length)
    if (val.length == 500) {
      alert('entered more than 500..');
    }
  }
  return (
    <div>
      <div className="contactUsSection">
        &nbsp;
      <div className="main">
          <div className="main-inner">
            <div className="logo">
              <img src={logosmall} alt={logosmall} />
            </div>
            <div className="left">
              <Formik
                initialValues={fields}
                validationSchema={_validationSchema}
                onSubmit={(values) => { submitForm(values) }}
              >
                {({ values, handleChange, handleBlur, handleSubmit, handleReset, touched, errors, }) => (
                  <form onSubmit={handleSubmit}>

                    <TextField
                      type="text"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="name"
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
                      fullWidth
                      multiline
                      rows={4}
                      label={t('message_enter')}
                      variant="outlined"
                      value={values.message}
                      onKeyDown={countWords}
                      error={Boolean(touched.message && errors.message)}
                      helperText={touched.message && errors.message}
                    />
                    <div className="col-md-6" style={{ 'margin-top': '22px' }}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                      >
                        <InputLabel>{('partnerType')}</InputLabel>
                        <Select
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="partnerType"
                          label={('partnerType')}
                          value={values.partnerType}
                          color="primary"
                          variant="outlined"
                        //   error={Boolean(touched.partner_type && errors.partner_type)}
                        //   helperText={touched.partner_type && errors.partner_type}
                        >
                          <MenuItem value="Supplier">Supplier</MenuItem>
                          <MenuItem value="Customer">Customer</MenuItem>
                          <MenuItem value="SupplierCustomer">SupplierCustomer</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>

                      </FormControl>
                    </div>


                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isLoading}
                      className="btn-blue btn-login"
                    >
                      {t('Submit')}
                    </Button>

                    <Button
                      onClick={handleReset}
                      variant="contained"
                      color="primary"
                      className="btn-blue btn-login"
                    >Reset</Button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="right">
              <h3>Get in Touch With Us</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore natus qui nemo ea sint totam, non, quo distinctio itaque, nesciunt cum.</p>
              <p className="text-center">
                <img src={socialmedia} alt={socialmedia} />
              </p>
              <div className="SocialMedia">
                <em>Social Media </em> :
                <FacebookIcon onClick={facebookclick} style={{ fontSize: 30, color: "#3b5a9a" }} />
                <TwitterIcon onClick={twitterclick} style={{ fontSize: 30, color: "#2ea0e7" }} />
                <LinkedInIcon onClick={linkedclick} style={{ fontSize: 30, color: "#007bb6" }} />
              </div>
            </div>
            <p className="text-right"><i>© Tecnics.com</i></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquirySaga;