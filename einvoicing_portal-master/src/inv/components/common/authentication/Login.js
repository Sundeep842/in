import React from 'react'
import './authentication.css'
import { TextField, Button } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import logo from '../../../images/logo.png'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { useLoginSlice } from './slice'
import { selectError, selectLoading, selectUser } from './slice/selectors'
import { Navigate } from 'react-router-dom';
import Loader from '../../../util/ui/Loader'


const Login = () => {

  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { actions } = useLoginSlice()
  const isLoading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const user = useSelector(selectUser)
  const formMetadata = {
    userId: "",
    password: ""
  }

  const formValidationSchema = Yup.object().shape({
    userId: Yup.string().max(6).required(t('userid_required')),
    password: Yup.string().max(50).required(t('password_required'))
  })

  const onLogin = (values) => {
    dispatch(actions.login(values))
  }

  const viewcontact = () => {
    navigate("/contactsaga", { replace: false })
  }


  return (<div className="login-container">
    {user !== null && <Navigate to={`/app/${user.roles[0]}/dashboard`} replace={true} />}
    <div className="left">
      <div id="owl-example" className="owl-carousel">
        <div className="item darkCyan">
          <div className="img-text">
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
          </div>
        </div>
        <div className="item forestGreen">
          <div className="img-text">
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
          </div>
        </div>
        <div className="item orange">
          <div className="img-text">
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="right">
      <div className="login-box">
        <Formik
          initialValues={formMetadata}
          validationSchema={formValidationSchema}
          onSubmit={(values) => { onLogin(values) }}
        >
          {({ values, handleBlur, handleChange, touched, errors, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="form text-center">
                <div className="logo ">
                  <img src={logo} alt="logo" />
                </div>
                <TextField
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="userId"
                  placeholder={t('userid_enter')}
                  fullWidth
                  value={values.userId}
                  margin="normal"
                  helperText={touched.userId && errors.userId}
                  error={Boolean(touched.userId && errors.userId)}
                  className="form-ctrl user-input"
                />
                <TextField
                  type="password"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  placeholder={t('password_enter')}
                  fullWidth
                  className="form-ctrl pswd-input mt-20"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                {error && (<div>{error.errorMessage}</div>)}
                <p className="text-right"><a href="/app/forgot_password" className="link">Forgot password?</a></p>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isLoading}
                  className="btn-blue btn-login"
                >
                  {t('login')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="otp-section">
        <Button
          onClick={viewcontact}
          className="btn-orange"
          color="primary"
          variant="contained">GET IN TOUCH</Button>
      </div>
      <div className="common_info_container">
        {isLoading && (<Loader isLoading={isLoading} />)}
      </div>
    </div>
  </div>)
}

export default Login
