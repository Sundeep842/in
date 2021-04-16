import React, { } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Grid,
    MenuItem,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    makeStyles
} from '@material-ui/core'
import '../styles.css'
import SearchIcon from '@material-ui/icons/Search'
import InputField from '../../../../../util/ui/form/InputField'
import ReadOnlyInputField from '../../../../../util/ui/form/ReadOnlyInputField'
import _Input from '../../../../../util/ui/form/_Input'
import SearchRecipient from './SearchRecipient'
import { useDispatch } from 'react-redux'
import {
    useInvoiceSlice
} from '../slice'


const useStyles = makeStyles((theme) => ({
    legend: {
        color: theme.palette.primary.main,
    }
}));

const InvoiceMetadata = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { actions } = useInvoiceSlice()
    const handleRecipientClick = () => {
        dispatch(actions.openSearchRecipients(true))
    }
    const classes = useStyles()

    return (
        <>
            <fieldset>
                <legend className={classes.legend}>{t('supplier_buyer_details')}</legend>
                <div style={{ textAlign: 'right' }}>
                    <ReadOnlyInputField
                        name="invoiceDetails.recipientCode"
                        label="Recipient Code"
                    />
                    <SearchRecipient />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className="invoice_header">
                            <span>1073 W sam Houston ParkWay,</span> <br />
                            <span>Hyd,</span> <br />
                            <span>500082</span>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="invoice_header">
                            <span>1073 W sam Houston ParkWay,</span> <br />
                            <span>Hyd,</span> <br />
                            <span>500082</span>
                        </div>
                    </Grid>
                </Grid>
            </fieldset>
            <fieldset>
                <legend className={classes.legend}>{t('invoice_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.invoicenum"
                            label={t('invoice_number')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.irn"
                            label={t('irn')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            select
                            name="invoiceDetails.invoice_subtype_code"
                            label={t('invoice_sub_type')}
                            defaultValue={"INV"}
                        >
                            <MenuItem value={"INV"}>INV</MenuItem>
                            <MenuItem value={"CRN"}>CRN</MenuItem>
                            <MenuItem value={"DBN"}>DBN</MenuItem>
                        </ReadOnlyInputField>

                    </Grid>
                </Grid>
                <Grid container spacing={3}>

                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.invoicedate"
                            type="date"
                            label={t('invoice_date')}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.invoice_currency_code"
                            label={t('currency_code')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.reverse_charge"
                            label={t('reverse_charge')}
                        />
                    </Grid>
                </Grid>
            </fieldset>
            <fieldset>
                <legend className={classes.legend}>{t('value_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.ecom_gstin"
                            label={t('ecom_gstin')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            select
                            name="invoiceDetails.igst_on_intra"
                            label={t('igst_on_intra')}
                            defaultValue={"false"}
                        >
                            <MenuItem value={"false"}>FALSE</MenuItem>
                            <MenuItem value={"true"}>TRUE</MenuItem>
                        </ReadOnlyInputField>
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.total_assessable_value"
                            label={t('total_assessable_value')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.igstvalue"
                            label={t('igstvalue')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.cgstvalue"
                            label={t('cgstvalue')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.sgstvalue"
                            label={t('sgstvalue')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.cessvalue"
                            label={t('cessvalue')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.statecessvalue"
                            label={t('statecessvalue')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.discount"
                            label={t('discount')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.other_charges"
                            label={t('other_charges')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.roundoff"
                            label={t('roundoff')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDetails.total_invoice_value"
                            label={t('total_invoice_value')}
                        />
                    </Grid>
                </Grid>
            </fieldset>

        </>
    )
}
export default React.memo(InvoiceMetadata)
