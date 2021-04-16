
import React, { useState, useEffect } from 'react'
import { TextField,Typography,Button} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest } from '../../../../../Request'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RECIPIENT_API_END_URL } from '../../../../constants/Constants'


const RecipientEmail = (props) => {
  let { id } = useParams();
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const recipientemail = {
    recipientId: "",
    emailAddress:" "
  }
   const _validationSchema = Yup.object().shape({
    recipientId: Yup.string().max(7).required(t('recipient_id_required')),
    // emailAddress: Yup.string().email(t('param_email_invalid')).required(t('param_require')),
   })
  

  return (
    <Formik
      initialValues={recipientemail}
      validationSchema={_validationSchema}
      onSubmit={async (values, { setSubmitting}) => {
        let params={
          "recipientId":values.recipientId,
          "emailAddress":values.emailAddress
        }
        // setSubmitting(true)
          const _data = await invokeAPIRequest(RECIPIENT_API_END_URL,params,true)
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
                }}>Email Form</Typography>
              </div>
            </div> */}
            <TextField
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientId"
              // placeholder={t('name_enter')}
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
              name="emailAddress"
              //   placeholder={t('contactNo_enter')}
              fullWidth
              label={t('emailAddress')}
              variant="outlined"
              value={values.emailAddress}
              error={Boolean(touched.emailAddress && errors.emailAddress)}
              helperText={touched.emailAddress && errors.emailAddress}
            />
            {/* <Button color="secondary" type="submit" disabled={isSubmitting}
              className="btn-blue btn-login"
            >Reply
                  </Button> */}
          </div>
        </form>
      )}
    </Formik>


  )
}

export default RecipientEmail
