import React from 'react'
import {
  Grid
} from '@material-ui/core'
import './formfields.css'
import InputField from '../../../util/ui/form/InputField'
import DateField from '../../../util/ui/form/DateField'
import FileUploader from '../../../util/ui/uploader/FileUploader'
import { useTranslation } from 'react-i18next'


const CompanyDetails = (props) => {

  const { formFields } = props
  const { gstinDetails, msmeDetails, folderId } = formFields
  const { t } = useTranslation()
  const { gstin, businessName, stateCode, registrationYear, gstinCertId } = gstinDetails
  const { msmeRegNo, msmeType, msmeRegDate, msmeDocId, additionalInfo } = msmeDetails
  const { gstinDocuments, setGstinDocuments } = props
  const { msmeDocuments, setMsmeDocuments } = props
  const gstin_props = [
    {
      "name": "document_type",
      "value": "Registration"
    },
    {
      "name": "document_sub_type",
      "value": "GSTIN document"
    }
  ]

  const msme_props = [
    {
      "name": "document_type",
      "value": "Registration"
    },
    {
      "name": "document_sub_type",
      "value": "MSME"
    }
  ]

  const allowedMimeTypes = ['image/*', 'application/pdf']

  return (
    <div className="company_details">
      <div arial-label="ccompany_details" className="company_main">
        <div className="company_title">{t('gstin_details')}</div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputField name={gstin.name} label={gstin.label} />
          </Grid>
          <Grid item xs={4}>
            <InputField name={businessName.name} label={businessName.label} />
          </Grid>
          <Grid item xs={4}>
            <InputField name={stateCode.name} label={stateCode.label} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputField name={registrationYear.name} label={registrationYear.label} />
          </Grid>
          <Grid item xs={4}>
            <InputField name={gstinCertId.name} label={gstinCertId.label} />
          </Grid >
          <Grid item xs={4}>
            <FileUploader documents={gstinDocuments} title={t('upload_gstin_docs')} setDocuments={setGstinDocuments} folderId={folderId} documentProperties={gstin_props} maxUplods={1} allowedMimeTypes={allowedMimeTypes} />
          </Grid>
        </Grid>
      </div>
      <div aria-label="contact person details" className="contact_person">
        <div className="msme_title">{t('msme_details')}</div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputField name={msmeRegNo.name} label={msmeRegNo.label} />
          </Grid>
          <Grid item xs={4}>
            <InputField name={msmeType.name} label={msmeType.label} />
          </Grid>
          <Grid item xs={4}>
            <DateField name={msmeRegDate.name} label={msmeRegDate.label} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputField name={additionalInfo.name} label={additionalInfo.label} />
          </Grid>
          <Grid item xs={4}>
            <FileUploader documents={msmeDocuments} title={t('upload_msme_docs')} setDocuments={setMsmeDocuments} folderId={folderId} documentProperties={msme_props} maxUplods={1} allowedMimeTypes={allowedMimeTypes} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default CompanyDetails
