import React from 'react'
import {
    Grid,
    makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import '../styles.css'
import InputField from '../../../../../util/ui/form/InputField'

const useStyles = makeStyles((theme) => ({
    legend : {
        color: theme.palette.primary.main,
    }
}));


const SupplierBuyerMetadata = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    return (
        <>
            <fieldset>
                <legend className={classes.legend}>{t('supplier_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_gstin"
                            label={t('gstin')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_legal_name"
                            label={t('legal_name')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_trading_name"
                            label={t('trading_name')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_location"
                            label={t('location')}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_pincode"
                            label={t('pin_code')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_email"
                            label={t('email')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_state"
                            label={t('state')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_address1"
                            multiline
                            rows={5}
                            label={t('address1')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.supplier_address2"
                            multiline
                            rows={5}
                            label={t('address2')}
                        />
                    </Grid>
                </Grid>
            </fieldset>
            <fieldset>
                <legend className={classes.legend}>{t('customer_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_gstin"
                            label={t('gstin')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_legal_name"
                            label={t('legal_name')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_trade_name"
                            label={t('trading_name')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_location"
                            label={t('location')}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_pincode"
                            label={t('pin_code')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_email"
                            label={t('email')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_state"
                            label={t('state')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_address1"
                            multiline
                            rows={5}
                            label={t('address1')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            name="invoiceSupplierBuyerDetails.billing_address2"
                            multiline
                            rows={5}
                            label={t('address2')}
                        />
                    </Grid>
                </Grid>
            </fieldset>
        </>
    )
}

export default React.memo(SupplierBuyerMetadata)
