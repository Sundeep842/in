// index for my invoice component which displays all my UI elements
import React, { useEffect } from 'react'
import { useInvoiceSlice } from './slice'
import { useSelector, useDispatch } from 'react-redux'
import {
	Button
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import {
	selectAllInvoices,
	selectLoading
} from './slice/selector'
import { useTranslation } from 'react-i18next'
import Loader from '../../../util/ui/Loader'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition'

const Invoice = () => { // my main component
	const { actions } = useInvoiceSlice()
	const { t } = useTranslation()
	const isLoading = useSelector(selectLoading)
	const invoices = useSelector(selectAllInvoices)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState('Choose wisely');
	const handleClickOpen = () => {

		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const useEffectOnMount = (effect) => {
		useEffect(effect, []);
	};
	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
		if (event.target.value === 'Json') {
			setHelperText('if you choose this you need to upload the json file');
		}
		else{
			setHelperText('are you sure do you want to enter the data in the form manually');
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		if (value === 'Json') {
			
			navigate("/app/vendor_manager/json_upload", { replace: false })
		} else {
			
			navigate("/app/vendor_manager/invoice_upload", { replace: false })
		}
	};
	useEffectOnMount(() => {
		dispatch(actions.loadInvoices());
	});

	const columns = [
		{ field: 'id', headerName: t('id'), width: 200, hide: true },
		{ field: 'invoicenum', headerName: t('invoicenum'), width: 180 },
		{ field: 'invoicedate', headerName: t('invoicedate'), width: 180 },
		{ field: 'supply_type', headerName: t('supply_type'), width: 180 , hide: true },
		{ field: 'company_name', headerName: t('company_name'), width: 180 },
		{ field: 'total_invoice_value', headerName: t('total_invoice_value'), width: 180 },
		{ field: 'invoice_status', headerName: t('invoice_status'), width: 180 },
		{ field: 'status', headerName: t('dispatched'), width: 180 }
	]

	const rows = []

	const createInvoiceGrid = () => {
		invoices.forEach((_invoice) => {
			rows.push(Object.assign({}, _invoice, { id: _invoice.document_ref_id }))
		})
	}

	const uploadInvoice = () => {

	}

	return (
		<div>
			<div>

				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">{"Select whether you upload a Json file or upload through form"}</DialogTitle>
					<DialogActions>
						<form onSubmit={handleSubmit} className="radioForm">
							<FormControl component="fieldset" error={error} className={classes.formControl}>
								<RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
									<FormControlLabel value="Json" control={<Radio />} label="Json File" />
									<FormControlLabel value="Form" control={<Radio />} label="Form" />
								</RadioGroup>
								<FormHelperText>{helperText}</FormHelperText>
								<Button type="submit" variant="outlined" color="primary" className={classes.button}>
									Upload Invoice
        </Button>
							</FormControl>
						</form>
						{/* <Button autoFocus onClick={handleClose} color="primary">
							Disagree
	 </Button>
						<Button onClick={handleClose} color="primary" autoFocus>
							Agree
	 </Button> */}
					</DialogActions>
				</Dialog>
			</div>
			<div className="invoice_container">
				<div className="submit_invoice_container">
					<Button
						onClick={() => { handleClickOpen() }}
						color="primary"
						variant="contained"
					>{t('upload_invoice')}</Button>
				</div>
				{/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
					Open responsive dialog
		</Button> */}
				{invoices.length > 0 && createInvoiceGrid()}
				<div style={{ height: '70vh', width: '100%' }}>
					<DataGrid columns={columns} rows={rows} pageSize={10}
						onRowClick={(_row) => {
							navigate("/app/vendor_manager/invoice_upload/" + _row.row.id, { replace: false });
						}}
					/>
				</div>
			</div>
			{isLoading && <Loader isLoading={isLoading} />}
		</div>
	)
}
export default Invoice