import * as Yup from 'yup';
import {formFields} from './formMeta'

const {partnerDetails , contactDetails , gstinDetails , msmeDetails} = formFields
const {companyName , firmType , natureOfBusiness , panNo , partnerType, noOfPortalUsersAllowed , noOfInvoiceExpected , offeredServices , establishmentYear , country ,webSite } = partnerDetails
const {personName , address, city, state , personCountry , pinCode, mobileNumber , stdCodePhoneNumber , email } = contactDetails
const {gstin , businessName , stateCode ,registrationYear, gstinCertId} = gstinDetails
const {msmeRegNo ,msmeType,msmeRegDate,msmeDocId,additionalInfo} = msmeDetails


export const formValidationSchema = [

  Yup.object().shape({
    [companyName.name] : Yup.string().max(75).required('filed is missing value'),
    [firmType.name] : Yup.string().max(20).required('filed is missing value'),
    [natureOfBusiness.name] : Yup.string().max(200).required('filed is missing value'),
    [panNo.name] : Yup.string().max(75).required('filed is missing value'),
    [partnerType.name] : Yup.string().max(75).required('filed is missing value'),
    [noOfPortalUsersAllowed.name] : Yup.number().required('filed is missing value'),
    [noOfInvoiceExpected.name] : Yup.number().required('filed is missing value'),
    [offeredServices.name] : Yup.string().max(50).required('filed is missing value'),
    [establishmentYear.name] : Yup.string().required('filed is missing value'),
    [country.name] : Yup.string().max(10).required('filed is missing value'),
    [webSite.name] : Yup.string().max(250).required('filed is missing value'),
    [personName.name] : Yup.string().max(50).required('filed is missing value'),
    [address.name] : Yup.string().max(100).required('filed is missing value'),
    [city.name] : Yup.string().max(25).required('filed is missing value'),
    [state.name] : Yup.string().max(2).required('filed is missing value'),
    [personCountry.name] : Yup.string().max(10).required('filed is missing value'),
    [pinCode.name] : Yup.string().max(6).required('filed is missing value'),
    [mobileNumber.name] : Yup.number().required('filed is missing value'),
    [stdCodePhoneNumber.name] : Yup.string().max(15).required('filed is missing value'),
    [email.name] : Yup.string().max(100).required('filed is missing value')

  }),
  Yup.object().shape({
    [gstin.name] : Yup.string().max(15).required('filed is missing value'),
    [businessName.name] : Yup.string().max(75).required('filed is missing value'),
    [stateCode.name] : Yup.string().max(2).required('filed is missing value'),
    [registrationYear.name] : Yup.string().max(4).required('filed is missing value'),
    [gstinCertId.name] : Yup.string().max(32).required('filed is missing value'),
    [msmeRegNo.name] : Yup.string().max(12).required('filed is missing value'),
    [msmeType.name] : Yup.string().max(5).required('filed is missing value'),
    [msmeRegDate.name] : Yup.string().max(10).required('filed is missing value'),
    [msmeDocId.name] : Yup.string().max(32).required('filed is missing value'),
    [additionalInfo.name] : Yup.string().max(100).required('filed is missing value')
  })
]
