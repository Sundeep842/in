import React, { useState } from 'react'
import '../styles.css'
import { FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import GridUploader from './GridUploader'
import { FormControl, Grid, IconButton, InputAdornment, InputLabel } from '@material-ui/core'
import { actions } from '../slice'
import { useDispatch } from 'react-redux'
import _Input from '../../../../util/ui/form/_Input'
import InputField from '../../../../util/ui/form/InputField'
import { SearchIcon } from '@material-ui/data-grid'
import SearchRecipient from '../../invoicejsonupload/_components/SearchRecipient'
import { useFormikContext } from 'formik'
const Attachments = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { values } = useFormikContext()
    const [inpVal, setInpVal] = useState("")
    console.dir(values)

    const handleRecipientClick = () => {
        dispatch(actions.openSearchRecipients(true))
    }
    return (
        <div className="attachments_container">
            <Grid container spacing={12}>

                <Grid item xs={7}>

                    <FieldArray
                        name="invoiceJson"
                        label={t('attachments')}
                    >
                        {(props) => (
                            <div style={{ width: "100vh",height:"150px" }}>
                                <GridUploader  allowedMimeTypes={["application/json"]} maxUplods={1} _items={props.form.values.invoiceJson} insert={props.insert} remove={props.remove} doc_type="InvoiceJson" folderId="" title={t('upload_invoice_Json')} />
                            </div>
                        )}
                    </FieldArray>

                </Grid>
                <Grid item xs={5}>

                    <div >
                        {/** <FormControl variant="standard" >
                        <InputLabel>Recipient Code</InputLabel>
                        <_Input
                            name="recipientCode"
                            label="Recipient Code"
                            defaultValue={values.recipientCode}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={handleRecipientClick}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>*/}
                        <div style={{ display: "inline-flex" }}>
                            <InputField
                                name="recipientCode"
                                label="Recipient Code"
                            />
                            <IconButton
                                edge="end"
                                onClick={handleRecipientClick}
                            >
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <SearchRecipient myval={setInpVal} />
                    </div>

                </Grid>
            </Grid>
            <Grid item xs={12} style={{display:"inline-flex"}}>

                <Grid >



                    <FieldArray
                        name="invoiceAttachmentDetails"
                        label={t('attachments')}
                    >
                        {(props) => (
                            <div style={{ width: "100vh", marginRight:"50px"}}>
                                <GridUploader insert={props.insert}  allowedMimeTypes={['image/*', 'application/pdf', 'text/html', 'text/plain']} maxUplods={1} _items={props.form.values.invoiceAttachmentDetails} insert={props.insert} doc_type="InvoiceAttachment" folderId="" title={t('upload_invoice_documents')} />
                            </div>
                        )}
                    </FieldArray>

                </Grid>
                <Grid >



                    <FieldArray
                        name="invoiceAttachmentDetails"
                        label={t('attachments')}
                    >
                        {(props) => (
                            <div style={{ width: "80vh" ,marginRight:"150px" }} >
                                <GridUploader insert={props.insert}  allowedMimeTypes={['image/*', 'application/pdf', 'text/html', 'text/plain']} maxUplods={100} _items={props.form.values.invoiceAttachmentDetails} insert={props.insert} doc_type="InvoiceSupportingDocument" folderId="" title={t('upload_supporting_documents')} />
                            </div>
                        )}
                    </FieldArray>

                </Grid>


            </Grid>
        </div>
    )
}

export default Attachments
