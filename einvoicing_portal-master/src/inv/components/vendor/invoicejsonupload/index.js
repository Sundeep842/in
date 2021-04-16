import React, { useState } from 'react'
import GridUploader from './_components/GridUploader'
import { useTranslation } from 'react-i18next'
import { FieldArray, Formik } from 'formik'
import Attachments from './_components/Attachments'
import * as Yup from 'yup'
import { Form } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { actions } from './slice'
function UploadJsonInvoice() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [_files, setFiles] = useState([])
	// const[invoiceJson,setInvoiceJson]=useState([])
	// const[supportingDocuments,setSupportingDocuments]=useState([])
	// const[invoiceDocument,setInvoiceDocument]=useState([])
	let invoiceInitialDetails = {
		invoiceAttachmentDetails: [],
		invoiceJson: [],
		recipientCode : ''

	}
	const handleInvoiceSubmit = (val) => {
		
		console.dir(val)
		dispatch(actions.InvoiceJsonSub(val))
	}
	const _validationSchema = Yup.object().shape({
		invoiceDetails: Yup.object().shape({
			invoicenum: Yup.string().max(6).required(t('param_require'))
		})
	})
	return (

		<div className="attachments_container">
			<Formik
				initialValues={invoiceInitialDetails}
				onSubmit={(values) => {
					alert('called')
				}}
			>
				{({values}) => (
					<Form>
						<Attachments  />
						<Button 
							color="primary"
							variant="contained"
							onClick={ 
								(e)=>handleInvoiceSubmit(values)
							}
						>Submit</Button> 
					</Form>
				)}
			</Formik>
		</div >
	)
}
export default UploadJsonInvoice
