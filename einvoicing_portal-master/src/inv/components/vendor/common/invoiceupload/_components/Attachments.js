import React from 'react'
import '../styles.css'
import { FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import GridUploader from '../../../../../util/ui/uploader/GridUploader'

const Attachments = () => {
    const { t } = useTranslation()
    return (
        <div className="attachments_container">
            <FieldArray
                name="invoiceAttachmentDetails"
                label={t('attachments')}
            >
                {(props) => (
                    <>
                        <GridUploader _items={props.form.values.invoiceAttachmentDetails} insert={props.insert} remove={props.remove} doc_type="Invoice" folderId="" title={t('upload_invoice_documents')} maxUplods={1} />
                        <GridUploader _items={props.form.values.invoiceAttachmentDetails} insert={props.insert}  remove={props.remove} doc_type="Invoice" folderId="" title={t('upload_supporting_documents')} maxUplods={100}/>
                    </>
                )}
            </FieldArray>
        </div>
    )
}

export default Attachments
