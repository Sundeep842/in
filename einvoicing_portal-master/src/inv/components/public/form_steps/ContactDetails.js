import React from 'react'
import {
  Grid,
  Checkbox
} from '@material-ui/core'
import './formfields.css'
import InputField from '../../../util/ui/form/InputField'
import SelectField from '../../../util/ui/form/SelectField'
import DateField from '../../../util/ui/form/DateField'
import { useTranslation } from 'react-i18next'


const ContactDetails = (props) => {

  const {formFields} = props
  const {partnerDetails , contactDetails} = formFields
  const {t} = useTranslation()
  const {companyName , firmType , natureOfBusiness ,businessFunction, panNo , partnerType , noOfPortalUsersAllowed , noOfInvoiceExpected , offeredServices ,establishmentYear , country , webSite } = partnerDetails
  let { exposeToAllVendors } = partnerDetails
  const { personName , city , personCountry , email , mobileNumber ,  address , pinCode, state, stdCodePhoneNumber } = contactDetails
  

  return (
    <div className="contact_details">
        <div arial-label="contact_details" className="contact_partner">
            <div className="partner_title">{t('company_partner_details')}</div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <InputField name={companyName.name} label={companyName.label}/>
                </Grid>
                <Grid item xs={4}>
                  <SelectField name={firmType.name} label={firmType.label} fieldOf="FIRM_TYPE" moduleName="OnBoarding"/>
                </Grid>
                <Grid item xs={4}>
                  <InputField name={natureOfBusiness.name} label={natureOfBusiness.label} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <SelectField name={businessFunction.name} label={businessFunction.label} fieldOf="BUSINESS_FUNCTION" moduleName="OnBoarding"/>
                </Grid>
                <Grid item xs={4}>
                  <SelectField name={partnerType.name} label={partnerType.label} fieldOf="PARTNER_TYPE" moduleName="OnBoarding"/>
                </Grid>
                <Grid item xs={4}>
                  <InputField name={noOfPortalUsersAllowed.name} label={noOfPortalUsersAllowed.label}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <InputField name={noOfInvoiceExpected.name} label={noOfInvoiceExpected.label}/>
                </Grid>
                <Grid item xs={4}>
                  <InputField name={offeredServices.name} label={offeredServices.label} />
                </Grid>
                <Grid item xs={4}>
                  <DateField name={establishmentYear.name} label={establishmentYear.label} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <InputField name={panNo.name} label={panNo.label}/>
                </Grid>
                <Grid item xs={4}>
                  <SelectField name={country.name} label={country.label} fieldOf="COUNTRY" moduleName="Country Master"/>
                </Grid>
                <Grid item xs={4}>
                  <InputField name={webSite.name} label={webSite.label}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                   <Checkbox
                      checked={exposeToAllVendors}
                      onChange={(e) => { exposeToAllVendors = e.target.checked }}
                      name={exposeToAllVendors}
                      color="primary"
                    />
                    <span>{t('expose_all_vendors')}</span>
                </Grid>
            </Grid>
        </div>
        <div aria-label="contact person details" className="contact_person">
          <div className="contact_title">{t('company_contact_person_details')}</div>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField name={personName.name} label={personName.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField name={email.name} label={email.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField name={mobileNumber.name} label={mobileNumber.label}/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField name={stdCodePhoneNumber.name} label={stdCodePhoneNumber.label}/>
              </Grid>
              <Grid item xs={4}>
                <InputField name={address.name} label={address.label}/>
              </Grid>
              <Grid item xs={4}>
                <SelectField name={personCountry.name} label={personCountry.label} fieldOf="COUNTRY" moduleName="Country Master"/>
              </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <SelectField name={state.name} label={state.label} fieldOf="STATE" moduleName="OnBoarding" dependentOn="country" dependentValue=""/>
              </Grid>
              <Grid item xs={4}>
                <SelectField name={city.name} label={city.label} fieldOf="CITY" moduleName="OnBoarding" dependentOn="state" dependentValue=""/>
              </Grid>
              <Grid item xs={4}>
                <InputField name={pinCode.name} label={pinCode.label}/>
              </Grid>
          </Grid>
        </div>
    </div>
  )
}

export default ContactDetails
