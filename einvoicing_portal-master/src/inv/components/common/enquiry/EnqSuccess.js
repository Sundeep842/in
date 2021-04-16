import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import './enquiry.css'
import logosmall from '../../../images/logosmall.png';

const EnqSuccess = () => {
 
  return (
    <>
  <div>
      <div className="contactUsSection">
        &nbsp;
      <div className="main">
          <div className="main-inner">
            <div className="logo">
              <img src={logosmall} alt={logosmall} />
              <h1 align="center">Thank you</h1>
              <h2 align="center">Will get back to you soon</h2>
            </div>
            </div>
            </div>
            </div>
            </div>
  </>
  )
}


export default EnqSuccess
