// index for my invoice component which displays all my UI elements
import React, { useEffect, useState } from 'react'
import { useInvoiceSlice } from './slice'
import { useSelector, useDispatch } from 'react-redux'
import {
	Button, Tabs, Tab, TextField, InputLabel, Grid
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import {
	selectAllInvoices,
	selectLoading
} from './slice/selector'
import { useTranslation } from 'react-i18next'
import Loader from '../../../../util/ui/Loader'
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
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined'
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined'
import '../../../internal/invitations/invitation.css'
import TabPanel from '../../../../util/ui/tab/TabPanel'



const Invoice = () => { // my main component
	const { actions } = useInvoiceSlice()
	const { t } = useTranslation()
	const isLoading = useSelector(selectLoading)
	const invoices = useSelector(selectAllInvoices)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const navigation = useNavigate()
	const [valuetab, setValuetab] = useState(0)
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState('Choose wisely');
	const GET_ALL_INVOICES = `/app/vendor_manager/invoice_list`
	const handleClickOpen = () => {

		setOpen(true);
	};
	const handleTabChange = (event, newValue) => {
		setValuetab(newValue)
	}

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
		else {
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
		{ field: 'supply_type', headerName: t('supply_type'), width: 180, hide: true },
		{ field: 'company_name', headerName: t('company_name'), width: 180 },
		{ field: 'total_invoice_value', headerName: t('total_invoice_value'), width: 180 },
		{ field: 'invoice_status', headerName: t('invoice_status'), width: 180 },
		{ field: 'status', headerName: t('dispatched'), width: 180 }
	]

	const rows = []
	const rows1 = []

	const createInvoiceGrid = () => {
		let _invoices = invoices.filter((invoice) => {
			return invoice.status !== 'Submit' && invoice.status !== '' && invoice.status != null
		})
		_invoices.forEach((invoice) => {
			var _i = {
				id: invoice.document_ref_id,
				invoicenum: invoice.invoicenum,
				invoicedate: invoice.invoicedate,
				supply_type: invoice.supply_type,
				company_name: invoice.company_name,
				total_invoice_value: invoice.total_invoice_value,
				invoice_status: invoice.invoice_status,
				status: invoice.status,
			}
			rows.push(_i)
		})


		let _invoices_1 = invoices.filter((invoice) => {
			return invoice.status !== 'Draft' && invoice.status !== '' && invoice.status != null
		})
		_invoices_1.forEach((invoice) => {
			var _i = {
				id: invoice.document_ref_id,
				invoicenum: invoice.invoicenum,
				invoicedate: invoice.invoicedate,
				supply_type: invoice.supply_type,
				company_name: invoice.company_name,
				total_invoice_value: invoice.total_invoice_value,
				invoice_status: invoice.invoice_status,
				status: invoice.status,
			}
			rows1.push(_i)
		})

		// invoices.forEach((_invoice) => {
		// 	rows.push(Object.assign({}, _invoice, { id: _invoice.document_ref_id }))
		// })
	}

	const uploadInvoice = () => {

	}

	const handleRowClick = (_row) => {
		let status = _row.row.status;
		if (status === "Draft")
			navigate("/app/vendor_manager/invoice_upload/" + _row.row.id, { replace: false });
		else
			navigate("/app/vendor_manager/invoice_view/" + _row.row.id, { replace: false });
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
				<div className="partner_initations_list">
					<Tabs value={valuetab} onChange={handleTabChange}>
						<Tab icon={<TimerOutlinedIcon />} label={t('invoice_pending')} />
						<Tab icon={<GroupAddOutlinedIcon />} label={t('invoice_completed')} />
					
					</Tabs>
			
					<TabPanel value={valuetab} index={0}>
					<div className="search_wrapper">
            <input type="text" id="Search_cntrl" placeholder="Search..." />
			</div>
						<div className="gridInvPending">
							<DataGrid columns={columns} rows={rows} pageSize={10}
								onRowClick={(_row) => {
									handleRowClick(_row)
								}}
							/>
						</div>
					</TabPanel>
					<TabPanel value={valuetab} index={1}>
					<div>
				<div className="search_wrapper">
            <input type="text" id="Search_cntrl" placeholder="Search..." />
			</div>
			        <Grid container spacing={6}>
                            <Grid item xs={4}>
			<InputLabel >{t("fromdate")}:</InputLabel>
                                    <TextField 
                                        name="fromDate"
                                        type="date"
                                    />
									<InputLabel >{t("todate")}:</InputLabel>
                                    <TextField 
                                        name="toDate"
                                        type="date"
                                    />
									</Grid>
									<Grid item xs={4}>
									<InputLabel >{t("name")}:</InputLabel>
                                    <TextField 
                                        name="fromDate"
                                        type="text"
                                    />
									<InputLabel >{t("amount")}:</InputLabel>
                                    <TextField 
                                        name="fromDate"
                                        type="text"
                                    />
                                </Grid>
								</Grid>
			</div>
						<div className="gridInvPending">
							<DataGrid columns={columns} rows={rows1} pageSize={10}
								onRowClick={(_row) => {
									handleRowClick(_row)
								}} />
						</div>
			
					</TabPanel>
				</div>
				{invoices.length > 0 && createInvoiceGrid()}
			</div>
			{isLoading && <Loader isLoading={isLoading} />}
		</div>
	)
}
export default Invoice