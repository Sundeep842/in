import React from 'react'
import './formfields.css'
import InputField from '../../../util/ui/form/InputField'
import { useTranslation } from 'react-i18next'
import {
  Grid
} from '@material-ui/core'

const ReviewDetails = (props) => {
  const {formFields} = props
  const {partnerDetails , contactDetails , gstinDetails , msmeDetails} = formFields
  const {companyName , firmType , natureOfBusiness , panNo , partnerType, noOfPortalUsersAllowed , noOfInvoiceExpected , offeredServices , establishmentYear , country ,webSite } = partnerDetails
  const {personName , address, city, state , personCountry , pinCode, mobileNumber , stdCodePhoneNumber , email } = contactDetails
  const {gstin , businessName , stateCode ,registrationYear, gstinCertId} = gstinDetails
  const {msmeRegNo ,msmeType,msmeRegDate,msmeDocId,additionalInfo} = msmeDetails
  const {t} = useTranslation()
  return (
    <div className="review_details">
      <div className="company_details_container">
          <h5 className="company_details_review">{t('company_partner_details')}</h5>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={companyName.name} label={companyName.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={firmType.name} label={firmType.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={natureOfBusiness.name} label={natureOfBusiness.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={panNo.name} label={panNo.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={partnerType.name} label={partnerType.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={noOfPortalUsersAllowed.name} label={noOfPortalUsersAllowed.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={noOfInvoiceExpected.name} label={noOfInvoiceExpected.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={offeredServices.name} label={offeredServices.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={establishmentYear.name} label={establishmentYear.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={country.name} label={country.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={webSite.name} label={webSite.label}/>
              </Grid>
          </Grid>
        </div>
        <div className="contact_details_container">
          <h5 className="contact_details_review">{t('company_contact_person_details')}</h5>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={personName.name} label={personName.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={email.name} label={email.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={mobileNumber.name} label={mobileNumber.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={stdCodePhoneNumber.name} label={stdCodePhoneNumber.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={address.name} label={address.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={personCountry.name} label={personCountry.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={state.name} label={state.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={city.name} label={city.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={pinCode.name} label={pinCode.label}/>
              </Grid>
          </Grid>
        </div>
        <div className="gstin_details_container" aria-label="gstin details">
          <h5 className="gstin_details_review">{t('gstin_details')}</h5>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={gstin.name} label={gstin.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={businessName.name} label={businessName.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={stateCode.name} label={stateCode.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField disabled name={registrationYear.name} label={registrationYear.label}/>
            </Grid>
            <Grid item xs={4}>
              <InputField disabled name={gstinCertId.name} label={gstinCertId.label}/>
            </Grid >
          </Grid>
        </div>
        <div className="msme_details_container" aria-label="gstin details">
          <h5 className="msme_details_review">{t('msme_details')}</h5>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <InputField disabled name={msmeRegNo.name} label={msmeRegNo.label}/>
                </Grid>
                <Grid item xs={4}>
                  <InputField disabled name={msmeType.name} label={msmeType.label}/>
                </Grid>
                <Grid item xs={4}>
                  <InputField disabled name={msmeRegDate.name} label={msmeRegDate.label}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField disabled name={msmeDocId.name} label={msmeDocId.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField disabled name={additionalInfo.name} label={additionalInfo.label}/>
              </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default ReviewDetails
