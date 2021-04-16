import React from 'react';
import registration_response1 from './../../../images/registration_response1.png';
import logo from './../../../images/logo.png';

const InvitationResponse = () => {

  return (
    <div  className="registration_response">
      <img src={logo} alt="logo" className="reg_logo" />
      <div className="reg_msg">
        <p>Dear Jonattan Adam </p>
        <h3>Thank You!</h3>
        <span>We will get back to you soon.</span>
      </div>
      <p className="registration_response_img"> <img src={registration_response1} alt="Registration Response" /></p>
    </div>
  )
}

export default InvitationResponse
