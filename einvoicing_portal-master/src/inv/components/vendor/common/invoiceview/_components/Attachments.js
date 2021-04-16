import React from 'react'
import '../styles.css'
import { FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import GridUploader from '../../../../../util/ui/uploader/GridUploader'

const Attachments = () => {
    const { t } = useTranslation()
    return (
        <div className="attachments_container">
            <div>{t('upload_invoice_documents')}</div>
            <FieldArray
                name="invoiceAttachmentDetails"
                label={t('attachments')}
            >
                {(props) => (
                    <GridUploader  _items={props.form.values.invoiceAttachmentDetails} insert={props.insert} doc_type="Invoice" folderId=""/>
                )}
            </FieldArray>
        </div>
    )
}

export default Attachments
