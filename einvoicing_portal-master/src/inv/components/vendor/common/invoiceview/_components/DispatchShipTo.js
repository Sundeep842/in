import React from 'react'
import { useTranslation } from 'react-i18next'
import '../styles.css'
import {
    Grid,
    makeStyles
} from '@material-ui/core'
import InputField from '../../../../../util/ui/form/InputField'
import ReadOnlyInputField from '../../../../../util/ui/form/ReadOnlyInputField'
const useStyles = makeStyles((theme) => ({
    legend : {
        color: theme.palette.primary.main,
    }
}));


const DispatchShipTo = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    return (
        <div>
            <fieldset>
                <legend className={classes.legend}>{t('dispatch_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.dispatch_company_name"
                            label={t('company_name')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.dispatch_location"
                            label={t('location')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.dispatch_pincode"
                            label={t('pin_code')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.dispatch_address1"
                            multiline
                            rows={5}
                            label={t('address1')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.dispatch_address2"
                            multiline
                            rows={5}
                            label={t('address2')}
                        />
                    </Grid>
                </Grid>
            </fieldset>
            <fieldset>
                <legend className={classes.legend}>{t('ship_details')}</legend>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_gstin"
                            label={t('gstin')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_legal_name"
                            label={t('legal_name')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_trade_name"
                            label={t('trading_name')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_location"
                            label={t('location')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_pincode"
                            label={t('pin_code')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippintto_state"
                            label={t('state')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_address1"
                            multiline
                            rows={5}
                            label={t('address1')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ReadOnlyInputField
                            name="invoiceDispatchShiptoDetails.shippingto_address2"
                            multiline
                            rows={5}
                            label={t('address2')}
                        />
                    </Grid>
                </Grid>
            </fieldset>
        </div>
    )
}

export default React.memo(DispatchShipTo)
