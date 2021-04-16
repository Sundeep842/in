import React, { useEffect, useState } from 'react'
import './registration.css'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Stepper,
  StepLabel,
  Step
} from '@material-ui/core'
import { Formik, Form } from 'formik'
import ContactDetails from './form_steps/ContactDetails'
import CompanyDetails from './form_steps/CompanyDetails'
import ReviewDetails from './form_steps/ReviewDetails'
import { formFields } from './form_steps/formMeta'
import { formValidationSchema } from './form_steps/formValidationSchema'
import MultiStepButtons from './form_steps/MultiStepButtons'
import { invokeGetRequest, invokeAPIRequest } from '../../../Request'
import { GET_REGISTRATION_DETAILS, POST_REGISTRATION_DETAILS } from '../../constants/Constants'
import Loader from '../../util/ui/Loader'
import { useNavigate } from 'react-router-dom'

const { partnerDetails, contactDetails, gstinDetails, msmeDetails, folderId } = formFields
const { companyName, firmType, natureOfBusiness, businessFunction, panNo, partnerType, noOfPortalUsersAllowed, noOfInvoiceExpected, offeredServices, establishmentYear, country, webSite } = partnerDetails
const { personName, address, city, state, personCountry, pinCode, mobileNumber, stdCodePhoneNumber, email } = contactDetails
const { gstin, businessName, stateCode, registrationYear, gstinCertId } = gstinDetails
const { msmeRegNo, msmeType, msmeRegDate, msmeDocId, additionalInfo } = msmeDetails

const _defaultTime = () => {
  let d = new Date()
  return d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() :  '0' + d.getDate())
}

const _formFieldsInitials = {
  [companyName.name]: '',
  [firmType.name]: '',
  [natureOfBusiness.name]: '',
  [businessFunction.name]: '',
  [panNo.name]: '',
  [partnerType.name]: '',
  [noOfPortalUsersAllowed.name]: 0,
  [noOfInvoiceExpected.name]: 0,
  [offeredServices.name]: '',
  [establishmentYear.name]: _defaultTime(),
  [country.name]: '',
  [webSite.name]: '',
  [personName.name]: '',
  [address.name]: '',
  [city.name]: '',
  [state.name]: '',
  [personCountry.name]: '',
  [pinCode.name]: '',
  [mobileNumber.name]: '',
  [stdCodePhoneNumber.name]: '',
  [email.name]: '',
  [gstin.name]: '',
  [businessName.name]: '',
  [stateCode.name]: '',
  [registrationYear.name]: '',
  [gstinCertId.name]: '',
  [msmeRegNo.name]: '',
  [msmeType.name]: '',
  [msmeRegDate.name]: _defaultTime(),
  [msmeDocId.name]: '',
  [additionalInfo.name]: '',
  [folderId]: ''
}

const addMismatches = (key , value ) => {
  if(key === "partnerContactEmail")
     _formFieldsInitials["email"] = value

  if(key === "partnerCompanyName")
     _formFieldsInitials["companyName"] = value 

  if(key === "partnerContactMobileNo")
     _formFieldsInitials["mobileNumber"] = value 

  if(key === "partnerFirmType")
    _formFieldsInitials["firmType"] = value 

  if(key === "partnerType")
     _formFieldsInitials["partnerType"] = value 

  if(key === "partnerContactPersonName")
     _formFieldsInitials["personName"] = value 
}

const PartnerRegistration = () => {
  const { resgistrartionId } = useParams()
  const { t } = useTranslation()
  const [canAllowRegister, setCanAllowRegister] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [gstinDocuments, setGstinDocuments] = useState([])
  const [msmeDocuments, setMsmeDocuments] = useState([])
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  const [ isLoading , setIsLoading ] = useState(false)

  const steps = [
    {
      stepId: 1,
      stepLabel: t('contact_details'),
      stepIconName: 'BusinessIcon'
    },
    {
      stepId: 2,
      stepLabel: t('company_details'),
      stepIconName: 'BusinessIcon'
    },
    {
      stepId: 3,
      stepLabel: t('preview'),
      stepIconName: 'BusinessIcon'
    }
  ]
  useEffect(() => {
    // get registration details from DB
    let regId = null
    if (resgistrartionId.indexOf("=") > 0)
      regId = resgistrartionId.split("=")[1]
    else
      regId = resgistrartionId

    // call service and show loading in UI
    setIsLoading(true)
    setTimeout(() => {
      invokeGetRequest(GET_REGISTRATION_DETAILS.concat(regId), {}, false)
            .then((response) => {
              setIsLoading(false)
              if (response && response.hasError === false) {
                let json = JSON.parse(response.results.profileJsonDetails)
                // iterate object and set default values
                for (var key in json) {
                  if (json.hasOwnProperty(key)) {
                    var val = json[key];
                    // add missed key values ... MISMATCH JSON KEYS
                    addMismatches(key , val)
                    _formFieldsInitials[key] = val
                  }
                }
                formFields.folderId = json.folderID
                if (json.gstinDocuments !== undefined)
                  setGstinDocuments(json.gstinDocuments)
                if (json.msmeDocuments !== undefined)
                  setMsmeDocuments(json.msmeDocuments)

                setCanAllowRegister(true)
              }
            })
            .catch((error) => {
              setIsLoading(false)
              setCanAllowRegister(false)
            })
          },5000) // for demo to show loader functionality.. remove setTimeout once completed - 
    
  }, [])


  const formSubmission = (values) => {
    let regId = null
    if (resgistrartionId.indexOf("=") > 0)
      regId = resgistrartionId.split("=")[1]
    else
      regId = resgistrartionId

    // append msme documents and gstin documents to values
    values.msmeDocuments = msmeDocuments
    values.gstinDocuments = gstinDocuments
    if(values.hasOwnProperty("null") || values.hasOwnProperty(null))  // fallback code
      delete values.null

    let params = {
      "activityStatus": saved ? "Draft" : "Submit",
      "activityType": saved ? "Draft" : "Submit",
      "partnerProfileTransactions": [
        {
          "actionBy": values.personName,
          "actionComments": saved ? "draft save" : "registration submitted",
          "actionTaken": saved ? "Draft" : "Submit"
        }
      ],
      "profileJsonDetails": JSON.stringify(values)
    }

    setIsLoading(true)
    setTimeout(() => {
      invokeAPIRequest(POST_REGISTRATION_DETAILS.concat(regId), params, false)
      .then((response) => {
        setIsLoading(false)
        if (response && response.hasError === false) {
          navigate(`/partner/invitations/response/resgistrartionId=${regId}`, { replace: true })
        }
      })
      .catch((error) => {
        setIsLoading(false)
        alert('there is an error while submitting registration form');
      })
    },5000)   // this is for demo purpose only 
  }

  const handleRegistrationSubmission = (values, actions) => {
    if (currentStep === steps.length - 1) {
      actions.setSubmitting(true)
      formSubmission(values)
    } else {
      // move to next step
      if (saved) {
        actions.setSubmitting(true)
        formSubmission(values)
      } else {
        actions.setSubmitting(false)
        setCurrentStep(currentStep + 1);
      }
    }
  }

  const loadStepPane = () => {

    switch (currentStep) {

      case 0:
        return <ContactDetails formFields={formFields} />
      case 1:
        return <CompanyDetails formFields={formFields} gstinDocuments={gstinDocuments} setGstinDocuments={setGstinDocuments} msmeDocuments={msmeDocuments} setMsmeDocuments={setMsmeDocuments} />
      case 2:
        return <ReviewDetails formFields={formFields} />
    }
  }


  return (
    <div className="registration">
      {canAllowRegister && (
        <>
          <div className="user_details">
            <h5> {t('partnerContactEmail')} : {_formFieldsInitials.email}</h5>
          </div>
          <div>
            <Stepper activeStep={currentStep} alternativeLabel={true} orientation="horizontal">
              {steps.map((step) => (
                <Step key={step.stepId}>
                  <StepLabel>{step.stepLabel}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Formik
              initialValues={_formFieldsInitials}
              onSubmit={handleRegistrationSubmission}
            >
              {({  isSubmitting }) => (
                <Form id="registrationform">
                  {loadStepPane()}
                  <MultiStepButtons currentStep={currentStep} setCurrentStep={setCurrentStep} isSubmitting={isSubmitting} steps={steps} setSaved={setSaved} />
                </Form>
              )}

            </Formik>
          </div>
        </>
      )}
      <Loader isLoading={isLoading}/>
    </div>
  )
}
export default PartnerRegistration
