import { useInvoiceSlice } from './slice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
	Tabs,
	Tab,
	Button
} from '@material-ui/core'
import {
	selectLoading,
	selectError,
	selectTab,
	selectHasUploaded,
	selectInvoiceDetails
} from './slice/selector'
import { useTranslation } from 'react-i18next'
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined'
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined'
import Loader from '../../../util/ui/Loader'
import TabPanel from '../../../util/ui/tab/TabPanel'
import './styles.css'
import { Formik, Form } from 'formik'
import InvoiceMetadata from './_components/InvoiceMetadata'
import SupplierBuyerMetadata from './_components/SupplierBuyerMetadata'
import PaymentMetadata from './_components/PaymentMetadata'
import DispatchShipTo from './_components/DispatchShipTo'
import EWaybillMetadata from './_components/EWaybillMetadata'
import LineItems from './_components/LineItems'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Attachments from './_components/Attachments'
import * as Yup from 'yup'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import {
	selectUser
} from '../../common/authentication/slice/selectors'



const ViewInvoice = () => {
	const { actions } = useInvoiceSlice()
	const dispatch = useDispatch()
	const error = useSelector(selectError)
	const loading = useSelector(selectLoading)
	const { t } = useTranslation()
	const tabIndex = useSelector(selectTab)
	const isUploaded = useSelector(selectHasUploaded)
	const user = useSelector(selectUser)
	const { refId } = useParams()
	const invoiceDetails = useSelector(selectInvoiceDetails)
	const navigate = useNavigate()
	let invoiceInitialDetails = {
		invoiceDetails: {
			recipientCode: '',
			invoicenum: '',
			irn: '',
			invoice_subtype_code: '',
			invoicedate: '2021-03-06',
			invoice_currency_code: 'INR',
			supplier_note: '',
			reverse_charge: false,
			ecom_gstin: 0.0,
			igst_on_intra: false,
			total_assessable_value: 0.0,
			igstvalue: 0.0,
			cgstvalue: 0.0,
			sgstvalue: 0.0,
			cessvalue: 0.0,
			statecessvalue: 0.0,
			discount: 0.0,
			other_charges: 0.0,
			roundoff: 0.0,
			total_invoice_value: 0.0
		},
		invoiceSellerPaymentDetails: {
			payee_name: '',
			payee_financial_account: '',
			modeofpayment: '',
			financial_institution_branch: '',
			payment_terms: '',
			payment_instruction: '',
			credit_transfer: '',
			direct_debit: '',
			creditdays: 0,
			payment_due: 0.0,
			paid_amount: 0.0
		},
		invoiceDispatchShiptoDetails: {
			dispatch_company_name: '',
			dispatch_address1: '',
			dispatch_address2: '',
			dispatch_location: '',
			dispatch_pincode: '',
			dispatch_state: '',
			shippingto_gstin: '',
			shippingto_legal_name: '',
			shippingto_trade_name: '',
			shippingto_address1: '',
			shippingto_address2: '',
			shippingto_location: '',
			shippingto_pincode: '',
			shippintto_state: ''
		},
		invoiceSupplierBuyerDetails: {
			supplier_legal_name: '',
			supplier_trading_name: '',
			supplier_gstin: '',
			supplier_address1: '',
			supplier_address2: '',
			supplier_location: '',
			supplier_state: '',
			supplier_pincode: '',
			supplier_phone: '',
			supplier_email: '',
			billing_legal_name: '',
			billing_trade_name: '',
			billing_gstin: '',
			billing_pos: '',
			billing_address1: '',
			billing_address2: '',
			billing_state: '',
			billing_pincode: '',
			billing_phone: '',
			billing_email: '',
			billing_location: ''
		},
		invoiceEwayBillDetails: {
			transporter_id: '',
			transportername: '',
			transmode: '',
			transdistance: 0.0,
			transdocno: '',
			transdocdate: '2021-03-06',
			vehicleno: '',
			vehicleno: ''
		},
		lineItemDetails: [],
		invoiceAttachmentDetails: [],
		actionDetails: {
			"action_code": "001",
			"action_name": "Submit",
			"source": "portal"
		}
	}

	const useEffectOnMount = (effect) => {
		useEffect(effect, []);
	};

	useEffectOnMount(() => {
		if (refId != undefined)
			dispatch(actions.loadExistingInvoiceDetails(refId))
	});

	const handleTabChange = (event, newValue) => {
		dispatch(actions.changeTab(newValue))
	}

	const handleInvoiceSubmit = (values) => {
		dispatch(actions.uploadInvoice(values))
	}

	const saveForm = (values) => {
		if (values.actionDetails === null) {
			values.actionDetails = {}
			values.actionDetails.action_code = "002";
			values.actionDetails.action_name = "Draft";
		} else {
			values.actionDetails.action_code = "002";
			values.actionDetails.action_name = "Draft";
		}
		dispatch(actions.uploadInvoice(values))
	}

	const _validationSchema = Yup.object().shape({
		invoiceDetails: Yup.object().shape({
			invoicenum: Yup.string().max(6).required(t('param_require'))
		})
	})

	const reassignInitialValues = () => {
		invoiceInitialDetails = invoiceDetails
	}

	const handleDiscard = () => {
		navigate(`/app/${user.roles[0]}/invoice_list`, { replace: true })
	}

	const handleNavigate = () => {
		handleDiscard()
		dispatch(actions.emptyUploads(false));
	}

	return (
		<div>
			{isUploaded && handleNavigate()}
			{invoiceDetails != null && reassignInitialValues()}
			<div className="container">
				<Formik
					initialValues={invoiceInitialDetails}
					onSubmit={handleInvoiceSubmit}
					validationSchema={_validationSchema}
					enableReinitialize={true}
				>
					{({ values, validateForm, setFieldValue }) => (
						<Form className="invoice_main_form">
							<SplitterLayout>
								<div className="left_pane">
									<InvoiceMetadata setFieldValue={setFieldValue} />
								</div>
								<div className="right_pane">
									<Tabs
										value={tabIndex}
										onChange={handleTabChange}
										variant="scrollable"
									>
										<Tab icon={<TimerOutlinedIcon />} label={t('attachments')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('supplier_buyer_info')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('payment_info')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('dispatch_ship_to_details')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('eway_bill')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('line_items')} />
										<Tab icon={<GroupAddOutlinedIcon />} label={t('history')} />
									</Tabs>
									<TabPanel value={tabIndex} index={0}>
										{/** <Attachments />*/}
									</TabPanel>
									<TabPanel value={tabIndex} index={1}>
										<SupplierBuyerMetadata />
									</TabPanel>
									<TabPanel value={tabIndex} index={2}>
										<PaymentMetadata />
									</TabPanel>
									<TabPanel value={tabIndex} index={3}>
										<DispatchShipTo />
									</TabPanel>
									<TabPanel value={tabIndex} index={4}>
										<EWaybillMetadata />
									</TabPanel>
									<TabPanel value={tabIndex} index={5}>
										<LineItems />
									</TabPanel>
									
								</div>
							</SplitterLayout>
							<div className="actions">
								{/** we can add submit Query Buttons  */}
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="common_info_container">
				{loading && (<Loader isLoading={loading} />)}
				{error && (<div> An error in page </div>)}
			</div>

		</div>
	)

}

export default ViewInvoice